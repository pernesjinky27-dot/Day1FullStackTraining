import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../api/base";
import { AuthContext } from "../context/AuthProvider";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { setIsAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/token/`, {
        username: form.username,
        password: form.password,
      });
      setIsAuthenticated(true);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      nav("/profile", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#102B67] mb-8">Sign In</h1>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={onChange}
              placeholder=""
              className="w-full h-11 px-4 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102B67] focus:border-[#102B67] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              id="password"
              placeholder=""
              className="w-full h-11 px-4 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102B67] focus:border-[#102B67] transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-11 bg-[#102B67] hover:bg-[#0d2354] text-white rounded-md font-medium transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-sm text-gray-700">
          Don't have account yet?{" "}
          <Link
            to="/register"
            className="text-[#102B67] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
