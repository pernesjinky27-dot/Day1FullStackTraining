import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/base";

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Philippines",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================
  // Handle Input Change
  // =========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // Authenticated Request
  // =========================================
  const authenticatedRequest = async (config) => {
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
      // If error is not unauthorized, throw it normally
      if (err.response?.status !== 401) {
        throw err;
      }

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        throw new Error("Your session has expired. Please login again.");
      }

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/api/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );

        accessToken = refreshResponse.data.access;

        localStorage.setItem("access_token", accessToken);

        // Retry original request
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
  };

  // =========================================
  // Submit Checkout
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.postalCode.trim() ||
      !formData.country.trim()
    ) {
      setError("Please complete all shipping information.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await authenticatedRequest({
        method: "POST",
        url: `${BASE_URL}/api/checkout/xendit/`,
        data: formData,
      });

      const checkoutUrl = response.data.checkout_url;

      if (!checkoutUrl) {
        throw new Error("Xendit checkout URL was not returned.");
      }

      // Redirect customer to Xendit payment page
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Checkout error:", err);

      const backendError =
        err.response?.data?.error || err.response?.data?.detail;

      if (typeof backendError === "object") {
        setError(JSON.stringify(backendError));
      } else {
        setError(
          backendError ||
            err.message ||
            "Unable to create payment. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="mb-4 text-sm text-gray-500 transition hover:text-black"
        >
          ← Back to cart
        </button>

        <h1 className="text-3xl font-bold text-black">Checkout</h1>

        <p className="mt-2 text-sm text-gray-500">
          Enter your shipping information to continue to payment.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border border-gray-100 bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-xl font-bold text-black">
          Shipping Information
        </h2>

        {/* Full Name */}
        <div className="mb-5">
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>

          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Juan Dela Cruz"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#10275e]"
          />
        </div>

        {/* Address */}
        <div className="mb-5">
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Address
          </label>

          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House number, street, barangay"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#10275e]"
          />
        </div>

        {/* City + Postal Code */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="city"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              City
            </label>

            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Manila"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#10275e]"
            />
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>

            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="1000"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#10275e]"
            />
          </div>
        </div>

        {/* Country */}
        <div className="mt-5">
          <label
            htmlFor="country"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Country
          </label>

          <input
            id="country"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#10275e]"
          />
        </div>

        {/* Payment Info */}
        <div className="mt-8 rounded-md bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-800">
            Payment powered by Xendit
          </p>

          <p className="mt-1 text-xs text-gray-500">
            After continuing, you will be redirected to Xendit to complete your
            payment securely.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-[#10275e] py-3 text-sm font-medium text-white transition hover:bg-[#0c1d47] disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Creating Payment..." : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
