import { Link } from "react-router-dom";
import React from "react";
function Header() {
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
        <div className="flex gap-3">
          <Link to="/register">
            <button className="rounded border border-indigo-600 px-4 py-2 text-indigo-600 hover:bg-indigo-50">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
