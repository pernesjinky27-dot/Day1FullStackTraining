import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/base";

const Profile = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // Authenticated Axios Request
  // Automatically refresh token on 401
  // =========================================
  const authenticatedRequest = useCallback(async (config) => {
    let accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      throw new Error("Please login first.");
    }

    try {
      return await axios({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      if (err.response?.status !== 401) {
        throw err;
      }

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          throw new Error("Session expired.");
        }

        const refreshResponse = await axios.post(
          `${BASE_URL}/api/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        accessToken = refreshResponse.data.access;

        localStorage.setItem("access_token", accessToken);

        return await axios({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        throw new Error("Your session has expired. Please login again.");
      }
    }
  }, []);

  // =========================================
  // Fetch Orders
  // =========================================
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await authenticatedRequest({
        method: "GET",
        url: `${BASE_URL}/api/orders/`,
      });

      setOrders(response.data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          err.message ||
          "Failed to load purchase history."
      );
    } finally {
      setLoading(false);
    }
  }, [authenticatedRequest]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // =========================================
  // Logout
  // =========================================
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  // =========================================
  // Product Image
  // =========================================
  const getProductImage = (image) => {
    if (!image) {
      return "";
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${BASE_URL}${image}`;
  };

  // =========================================
  // Format Date
  // =========================================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#fdfdfd] px-4 py-7 font-sans text-black">
      <div className="mx-auto w-full max-w-[720px]">
        {/* ========================= */}
        {/* Profile Card */}
        {/* ========================= */}

        <section className="min-h-[141px] border border-gray-200 bg-white px-5 py-[14px] shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
          <h1 className="text-[24px] font-bold leading-tight">My Profile</h1>

          <div className="mt-[10px] space-y-[7px] text-[12px]">
            <div className="flex items-center">
              <span className="w-[67px] font-semibold">Username:</span>

              <span>
                {localStorage.getItem("username") || "User"}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-[67px] font-semibold">Email:</span>

              <span>
                {localStorage.getItem("email") || "Email not available"}
              </span>
            </div>
          </div>

          <div className="mt-[11px] flex justify-end">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-[6px] bg-red-600 px-[13px] py-[6px] text-[9px] font-medium text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </section>

        {/* ========================= */}
        {/* Purchase History */}
        {/* ========================= */}

        <section className="mt-[21px] min-h-[322px] border border-gray-100 bg-white px-5 py-[11px] shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
          <h2 className="text-[24px] font-bold leading-tight">
            Purchase History
          </h2>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-md bg-red-50 px-4 py-3 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-xs text-gray-500">
                Loading purchase history...
              </p>
            </div>
          ) : orders.length === 0 ? (
            /* Empty Orders */
            <div className="flex min-h-[200px] flex-col items-center justify-center">
              <p className="text-sm font-medium text-gray-700">
                No purchases yet
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Your completed orders will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-5">
              {/* ========================= */}
              {/* Orders */}
              {/* ========================= */}

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="mb-8 border-b border-gray-200 pb-6 last:border-none"
                >
                  {/* Order Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold">
                        Order #{order.id}
                      </p>

                      <p className="mt-1 text-[10px] text-gray-500">
                        {formatDate(order.paidAt)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold">
                        ₱{Number(order.totalPrice).toFixed(2)}
                      </p>

                      <p
                        className={`mt-1 text-[10px] font-medium ${
                          order.isPaid
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.isPaid ? "Paid" : order.xendit_status}
                      </p>
                    </div>
                  </div>

                  {/* ========================= */}
                  {/* Table Header */}
                  {/* ========================= */}

                  <div className="grid grid-cols-[1fr_1.8fr_1fr_0.7fr_1fr] items-center gap-3 border-b border-gray-200 pb-2 text-[9px] font-semibold">
                    <div>Image</div>

                    <div>Product</div>

                    <div>Price</div>

                    <div className="text-center">Qty</div>

                    <div className="text-right">Amount</div>
                  </div>

                  {/* ========================= */}
                  {/* Order Items */}
                  {/* ========================= */}

                  <div>
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1fr_1.8fr_1fr_0.7fr_1fr] items-center gap-3 border-b border-gray-100 py-4 text-[9px] last:border-none"
                      >
                        {/* Product Image */}
                        <div>
                          {item.product?.image ? (
                            <img
                              src={getProductImage(item.product.image)}
                              alt={item.product.product_name}
                              className="h-[40px] w-[60px] object-contain"
                            />
                          ) : (
                            <div className="flex h-[40px] w-[60px] items-center justify-center bg-gray-100 text-[8px] text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                        {/* Product Name */}
                        <div className="font-medium">
                          {item.product?.product_name || "Product"}
                        </div>

                        {/* Price */}
                        <div>
                          ₱{Number(item.price).toFixed(2)}
                        </div>

                        {/* Quantity */}
                        <div className="text-center">
                          {item.qty}
                        </div>

                        {/* Line Total */}
                        <div className="text-right font-medium">
                          ₱{Number(item.line_total).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  {order.shipping && (
                    <div className="mt-4 rounded-md bg-gray-50 p-3 text-[10px] text-gray-600">
                      <p className="font-semibold text-gray-800">
                        Shipping Address
                      </p>

                      <p className="mt-1">
                        {order.shipping.fullName}
                      </p>

                      <p>
                        {order.shipping.address},{" "}
                        {order.shipping.city},{" "}
                        {order.shipping.postalCode}
                      </p>

                      <p>{order.shipping.country}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;