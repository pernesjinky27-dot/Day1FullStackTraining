from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


# Create your views here.
from rest_framework.response import Response 
from .models import Product, cartUser
from .serializers import ProductSerializer, RegisterSerializer


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status = status.HTTP_201_CREATED)  
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

@api_view(['GET'])
def product_list(request):
    products  = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product_data(request, pk):
    product = get_object_or_404(Product, pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def cart_view(request):
    """
    Return all cart items belonging to the authenticated user.
    """
    cart_items = (
        cartUser.objects
        .filter(user=request.user)
        .select_related("product")
        .order_by("id")
    )

    items = []

    for cart_item in cart_items:
        product_data = ProductSerializer(
            cart_item.product,
            context={"request": request}
        ).data

        items.append({
            "id": cart_item.id,
            "product": product_data,
            "qty": cart_item.qty,
            "subtotal": cart_item.product.product_price * cart_item.qty,
        })

    total_items = sum(item.qty for item in cart_items)

    total_price = sum(
        item.product.product_price * item.qty
        for item in cart_items
    )

    return Response({
        "items": items,
        "total_items": total_items,
        "total_price": total_price,
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def add_to_cart(request):
    """
    Add a product to the authenticated user's cart.

    Expected request body:
    {
        "product_id": 1,
        "qty": 2
    }
    """
    product_id = request.data.get("product_id")
    qty = request.data.get("qty", 1)

    if not product_id:
        return Response(
            {"detail": "product_id is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        qty = int(qty)
    except (TypeError, ValueError):
        return Response(
            {"detail": "qty must be a valid integer."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if qty < 1:
        return Response(
            {"detail": "qty must be at least 1."},
            status=status.HTTP_400_BAD_REQUEST
        )

    product = get_object_or_404(
        Product.objects.select_for_update(),
        pk=product_id
    )

    cart_item, created = cartUser.objects.get_or_create(
        user=request.user,
        product=product,
        defaults={"qty": qty}
    )

    if not created:
        new_qty = cart_item.qty + qty

        if new_qty > product.countInStock:
            return Response(
                {
                    "detail": (
                        f"Only {product.countInStock} item(s) "
                        "are available in stock."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item.qty = new_qty
        cart_item.save(update_fields=["qty"])

    elif qty > product.countInStock:
        # The cart item was created by get_or_create, so remove it
        # when the requested quantity is invalid.
        cart_item.delete()

        return Response(
            {
                "detail": (
                    f"Only {product.countInStock} item(s) "
                    "are available in stock."
                )
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response(
        {
            "detail": (
                "Product added to cart."
                if created
                else "Cart quantity updated."
            ),
            "cart_item": {
                "id": cart_item.id,
                "product": ProductSerializer(
                    product,
                    context={"request": request}
                ).data,
                "qty": cart_item.qty,
                "subtotal": product.product_price * cart_item.qty,
            }
        },
        status=(
            status.HTTP_201_CREATED
            if created
            else status.HTTP_200_OK
        )
    )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def update_cart(request, pk):
    """
    Update the quantity of a cart item.

    Expected request body:
    {
        "qty": 3
    }
    """
    cart_item = get_object_or_404(
        cartUser.objects.select_related("product").select_for_update(),
        pk=pk,
        user=request.user
    )

    qty = request.data.get("qty")

    if qty is None:
        return Response(
            {"detail": "qty is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        qty = int(qty)
    except (TypeError, ValueError):
        return Response(
            {"detail": "qty must be a valid integer."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if qty < 1:
        return Response(
            {"detail": "qty must be at least 1."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if qty > cart_item.product.countInStock:
        return Response(
            {
                "detail": (
                    f"Only {cart_item.product.countInStock} item(s) "
                    "are available in stock."
                )
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    cart_item.qty = qty
    cart_item.save(update_fields=["qty"])

    return Response({
        "detail": "Cart item updated.",
        "cart_item": {
            "id": cart_item.id,
            "product": ProductSerializer(
                cart_item.product,
                context={"request": request}
            ).data,
            "qty": cart_item.qty,
            "subtotal": (
                cart_item.product.product_price * cart_item.qty
            ),
        }
    })


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_cart(request, pk):
    """
    Delete one cart item belonging to the authenticated user.
    """
    cart_item = get_object_or_404(
        cartUser,
        pk=pk,
        user=request.user
    )

    cart_item.delete()

    return Response(
        {"detail": "Cart item deleted."},
        status=status.HTTP_200_OK
    )


import uuid
from decimal import Decimal
from django.conf import settings
from django.db import transaction
import requests
from .models import paymentMethod, ShippingAddress
from .serializers import CheckoutSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_xendit_payment(request):
    serializer = CheckoutSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    data = serializer.validated_data

    if not user.email:
        return Response(
            {'error': 'Your Account needs an email address before checkout.'},
            status=status.HTTP_400_BAD_REQUEST,
        )


    cart_items = cartUser.objects.filter(user=user).select_related('product')

    if not cart_items.exists():
        return Response(
            {'error': 'Cart is empty'},
            status=status.HTTP_400_BAD_REQUEST
        )

    total_price = sum(
        item.product.product_price * item.qty
        for item in cart_items
        )


    if not settings.XENDIT_SECRET_KEY:
        return Response(
            {'error': 'XENDIT_SECRET_KEY is not configured.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


    xendit_amount = float(Decimal(total_price).quantize(Decimal('0.01')))
    external_id = f'order-{user.id}-{uuid.uuid4().hex}'  

    payload = {
        'external_id': external_id,
        'amount': xendit_amount,
        'currency': 'PHP',
        'payer_email': user.email,
        'description': 'Order Payment',
        'success_redirect_url': settings.XENDIT_SUCCESS_REDIRECT_URL,
        'failure_redirect_url': settings.XENDIT_FAILURE_REDIRECT_URL,
        'customer': {
            'given_names': data['fullName'],
            'email': user.email
        },
        'customer_notification_preference': {
            'invoices_created': ['email'],
            'invoice_paid': ['email'],
            'invoice_expired': ['email'],
        }

    }


    try:
        xendit_response = requests.post(
            'https://api.xendit.co/v2/invoices',
            auth=(settings.XENDIT_SECRET_KEY, ''),
            json=payload,
            timeout=30,
        )
        xendit_response.raise_for_status()

        result = xendit_response.json()
    except requests.RequestException as exc:
        error_message = str(exc)
        if getattr(exc, 'response', None) is not None:
            try:
                error_message = exc.response.json()
            except ValueError:
                error_message = exc.response.text
        return Response(
            {'error': error_message},
            status=status.HTTP_400_BAD_REQUEST
        )

    if 'invoice_url' not in result or 'id' not in result:
        return Response({'error': result}, status=status.HTTP_400_BAD_REQUEST)

    checkout_url = result['invoice_url']
    xendit_invoice_id = result['id']
    xendit_status = result.get('status', 'PENDING')

    with transaction.atomic():
        payment = paymentMethod.objects.create (
            user=user,
            totalPrice=total_price,
            isPaid=False,
            xendit_invoice_id=xendit_invoice_id,
            xendit_external_id=external_id,
            xendit_status=xendit_status,
        )

        shippingsAddress.objects.create(
            paymentId=payment,
            fullName = data['fullName'],
            address = data['address'],
            city = data['city'],
            postalCode = data['postalCode'],
            country = data['country'],
        )
    return Response({'checkout_url': checkout_url}, status=status.HTTP_200_OK)


import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny



@api_view(['POST'])
@permission_classes([AllowAny])

def xendit_webhook(request):
    try:
        # Xendit callback verification
        callback_token = request.headers.get('x-callback-token')

        if not settings.XENDIT_CALLBACK_TOKEN:
            return Response(
                {'error': 'XENDIT_CALLBACK_TOKEN is not configured.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        if callback_token != settings.XENDIT_CALLBACK_TOKEN:
            return Response(
                {'error': 'Invalid Xendit callback token.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # DRF already parses JSON for application/json requests
        payload = request.data

        xendit_invoice_id = payload.get('id')
        xendit_external_id = payload.get('external_id')
        xendit_status = payload.get('status')

        if not xendit_invoice_id and not xendit_external_id:
            return Response(
                {'error': 'Missing Xendit invoice reference.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment = None

        if xendit_invoice_id:
            payment = paymentMethod.objects.filter(
                xendit_invoice_id=xendit_invoice_id
            ).first()

        if not payment and xendit_external_id:
            payment = paymentMethod.objects.filter(
                xendit_external_id=xendit_external_id
            ).first()

        if not payment:
            return Response(
                {'message': 'Payment not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Update Xendit status
        if xendit_status:
            payment.xendit_status = xendit_status
            payment.save(update_fields=['xendit_status'])

        # Ignore non-paid events
        if xendit_status not in ['PAID', 'SETTLED']:
            return Response(
                {'message': 'Xendit event received.'},
                status=status.HTTP_200_OK
            )

        # Make webhook idempotent
        if payment.isPaid:
            return Response(
                {'message': 'Payment already processed.'},
                status=status.HTTP_200_OK
            )

        payment.mark_paid()

        return Response(
            {
                'message': (
                    'Payment confirmed. '
                    'Order items created and cart cleared.'
                )
            },
            status=status.HTTP_200_OK
        )

    except Exception as exc:
        return Response(
            {'error': str(exc)},
            status=status.HTTP_400_BAD_REQUEST
        )


from .serializers import paymentMethodSerializer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_orders(request):
    payments = (
        paymentMethod.objects
        .filter(user=request.user)
        .order_by('-id')
        .prefetch_related('orderitem_set__product')
    )

    serializer = paymentMethodSerializer(
        payments,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)
