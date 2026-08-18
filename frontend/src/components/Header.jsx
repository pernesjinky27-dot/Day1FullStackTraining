import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600">JinksuShop</h1>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link to="/" className="hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-indigo-600">
                Products
              </Link>
            </li>
            <li>
              <Link to="/team" className="hover:text-indigo-600">
                Team
              </Link>
            </li>
          </ul>
        </nav>

        {/* Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="text-xl">
                <FaShoppingCart />
              </Link>
              <Link to="/profile" className="text-xl">
                <FaUser />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-950"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
