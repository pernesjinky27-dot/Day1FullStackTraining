import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/base";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const ProductData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/`);
      setLoading(false);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ProductData();
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <Loading />
      </div>
    );

  return (
    <section className="px-6 py-16">
      {/* Heading */}
      <h2 className="mb-12 text-center text-2xl font-extrabold tracking-wide text-[#10265A] md:text-3xl">
        PRODUCT LIST
      </h2>

      {/* Product grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              {/* Product image */}
              <img
                src={`${BASE_URL}${item.image}`}
                alt={item.product_name}
                className="h-40 w-full object-contain p-6"
              />

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between px-6 pb-6">
                {/* Name + price */}
                <div className="mb-1 flex items-start justify-between">
                  <p className="text-sm font-semibold text-gray-800">
                    {item.product_name}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    ${item.product_price}
                  </p>
                </div>

                {/* Brand */}
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {item.brand}
                </p>

                {/* Buy button */}
                <button className="self-end rounded bg-[#10265A] px-4 py-1.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#0b1d45]">
                  BUY
                </button>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* View-all CTA */}
      <div className="mt-14 flex justify-center">
        <a
          href="/products"
          className="rounded bg-[#10265A] px-8 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#0b1d45]"
        >
          View all products
        </a>
      </div>
    </section>
  );
};

export default ProductList;
