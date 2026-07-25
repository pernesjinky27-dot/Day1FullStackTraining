import { useState } from "react";
import productImage from "../assets/product_img/1.png";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const stock = 90;

  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={productImage}
            alt="Product"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Product Name</h1>

          <p className="text-3xl mt-4 font-semibold text-gray-800">$2000</p>

          <p className="mt-2 text-gray-600">
            Available Stocks:
            <span className="font-semibold ml-1">{stock}</span>
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-5 mt-6">
            <button
              onClick={decrease}
              className="w-10 h-10 bg-[#10255C] text-white text-xl font-bold hover:bg-[#0d1d4b] transition"
            >
              -
            </button>

            <span className="text-lg font-medium w-6 text-center">
              {quantity}
            </span>

            <button
              onClick={increase}
              className="w-10 h-10 bg-[#10255C] text-white text-xl font-bold hover:bg-[#0d1d4b] transition"
            >
              +
            </button>
          </div>

          {/* Add To Cart */}
          <button className="mt-5 w-72 h-11 bg-[#10255C] text-white font-medium hover:bg-[#0d1d4b] transition">
            Add to cart
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-20">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>

        <p className="text-gray-700 leading-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </section>
  );
};

export default ProductDetails;
