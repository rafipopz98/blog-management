"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <div className="flex items-center gap-4 text-2xl font-bold">
        <img src="/logo.png" className="w-8 h-8 rounded-full" alt="logo" />
        <span>Blog</span>
      </div>

      {/* mobile menu */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "X" : "☰"}
        </div>
        {/* mobile menu list  */}
        <div
          className={`w-full h-screen bg-[#FAEDCD] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${
            isOpen ? "-right-0" : "-right-[100%]"
          }`}
        >
          <a href="/">Home</a>
          <a href="/">Trending</a>
          <a href="/">Most Popular</a>
          <a href="/">About</a>
          <a href="/">
            <button className="py-2 px-4 rounded-3xl bg-[#D4A373] text-white">
              Login
            </button>
          </a>
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <a href="/">Home</a>
        <a href="/">Trending</a>
        <a href="/">Most Popular</a>
        <a href="/">About</a>
        <a href="/">
          <button className="py-2 px-4 rounded-3xl bg-[#D4A373] text-white">
            Login
          </button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
