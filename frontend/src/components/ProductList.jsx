import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "PRODUCT NAME",
    brand: "CISCO",
    price: "$2000",
    image: "/images/cisco-switch.png",
  },
  {
    id: 2,
    name: "PRODUCT NAME",
    brand: "CISCO",
    price: "$2000",
    image: "/images/cisco-switch.png",
  },
  {
    id: 3,
    name: "PRODUCT NAME",
    brand: "CISCO",
    price: "$2000",
    image: "/images/cisco-switch.png",
  },
  {
    id: 4,
    name: "PRODUCT NAME",
    brand: "CISCO",
    price: "$2000",
    image: "/images/cisco-switch.png",
  },
  {
    id: 5,
    name: "PRODUCT NAME",
    brand: "CISCO",
    price: "$2000",
    image: "/images/cisco-switch.png",
  },
  {
    id: 6,
    name: "PRODUCT NAME",
    brand: "CISCO",
    price: "$2000",
    image: "/images/cisco-switch.png",
  },
];

const ProductList = () => {
  return (
    <section className="py-16 px-6">
      <h2 className="mb-12 text-center text-3xl font-bold text-slate-800">
        PRODUCT LIST
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="mx-auto w-64 rounded-lg border bg-white p-5 shadow-md transition hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto h-28 object-contain"
            />

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <span className="text-sm font-semibold">{product.price}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-gray-600">{product.brand}</p>

                <Link to="/productDetails">
                  <button className="rounded bg-blue-900 px-4 py-1 text-xs font-semibold text-white hover:bg-blue-800">
                    BUY
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="rounded bg-blue-900 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-800">
          View all products
        </button>
      </div>
    </section>
  );
};

export default ProductList;
