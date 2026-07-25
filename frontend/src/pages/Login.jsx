import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#102B67] mb-8">Sign In</h1>

        {/* Form */}
        <form className="space-y-5">
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
              type="password"
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
};

export default Login;
