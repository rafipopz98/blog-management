"use client";
import { auth } from "@/api/auth/auth";
import { ApiError } from "@/helpers/axiosHelper";
import { errorToast, successToast } from "@/helpers/projectHelpers";
import { ROUTE } from "@/helpers/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const { isPending, mutateAsync } = auth.useUserLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await mutateAsync({ email, password });
      successToast({
        title: "Login Successful",
        msg: "You've logged in successfully.",
      });
      navigate.push(ROUTE.HOME);
    } catch (err) {
      const apiErr = err as ApiError;
      console.log("error", apiErr.message);
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col lg:flex-row  bg-[#FEFAE0]">
      {/* Left side: Login */}
      <div className="flex flex-col justify-center rounded-l-3xl items-center h-full px-6 py-8 lg:w-[47%] bg-[#FAEDCD] shadow-xl">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#D4A373]">
            Welcome Back 👋
          </h1>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-[#D4A373] sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-[#D4A373] sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#D4A373] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#c18d5d] transition-all duration-200 shadow-md"
          >
            Sign In
          </button>

          <p className="text-sm text-gray-600 my-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate.push(ROUTE.REGISTER)}
              className="text-[#D4A373] cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Right side image */}
      <section className="hidden lg:block flex-1 relative">
        <div
          className="absolute inset-0 rounded-r-3xl bg-cover bg-center shadow-xl"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1628786739444-6186c7c79834?q=80&w=898&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          }}
        ></div>
      </section>
    </div>
  );
};

export default LoginPage;
