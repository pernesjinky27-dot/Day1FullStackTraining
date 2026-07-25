import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#102B67] mb-8">Sign Up</h1>

        {/* Form */}
        <form className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              className="w-full h-11 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#102B67] focus:border-[#102B67]"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              className="w-full h-11 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#102B67] focus:border-[#102B67]"
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
              id="password"
              type="password"
              className="w-full h-11 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#102B67] focus:border-[#102B67]"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              className="w-full h-11 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#102B67] focus:border-[#102B67]"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full h-11 bg-[#102B67] hover:bg-[#0D2354] text-white font-semibold rounded-md transition-colors duration-300"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-sm text-gray-700">
          I already had an account.{" "}
          <Link
            to="/login"
            className="text-[#102B67] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
