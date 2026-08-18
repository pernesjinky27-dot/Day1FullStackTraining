from rest_framework import serializers
from .models import Product, ShippingAddress, OrderItem, paymentMethod
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True)
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'qty', 'price', 'line_total'
        ]
    
    def get_line_total(self, obj):
        return obj.qty * obj.price

class paymentMethodSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    shipping = serializers.SerializerMethodField()

    class Meta:
        model = paymentMethod
        fields = [ 'id', 'totalPrice', 'isPaid', 'paidAt',
        'xendit_invoice_id', 'xendit_external_id', 'xendit_status','items', 'shipping']

        def get_items(self,obj):
            qs = obk.orderitem_set.select_related('product').all()
            return OrderItemSerializer(qs, many=True).data  
        
        def get_shipping(self, obj):
            addr = ShippingAddress.objects.filter(paymentId=obj).first()
            if addr:
                return ShippingAddressSerializer(addr).data
            return None

class CheckoutSerializer(serializers.Serializer):
    fullName = serializers.CharField(max_length = 255)
    address = serializers.CharField(max_length = 255)
    city = serializers.CharField(max_length = 255)
    postalCode = serializers.CharField(max_length = 255)
    country = serializers.CharField(max_length = 255)

        
