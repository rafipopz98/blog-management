"use client";
import React, { useState } from "react";
import Image from "./Image";
import Link from "next/link";
import { ROUTE } from "@/helpers/routes";
import { useUser } from "@/hooks/use-user";
import useHasMounted from "@/hooks/has-mounted";

const Navbar = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const hasMounted = useHasMounted();

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}

      <Link
        href={ROUTE.HOME}
        className="flex items-center gap-4 text-2xl font-bold"
      >
        <Image src="logo.png" alt="Lama Logo" w={32} h={32} />
        <span>blogs</span>
      </Link>

      {/* mobile menu */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-[5.4px]">
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                isOpen && "rotate-45"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black transition-all ease-in-out ${
                isOpen && "opacity-0"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                isOpen && "-rotate-45"
              }`}
            ></div>
          </div>
        </div>
        {/* mobile menu list  */}
        <div
          className={`w-full h-screen bg-[#FAEDCD] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${
            isOpen ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link href={ROUTE.HOME} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href={ROUTE.TRENDING_BLOGS} onClick={() => setIsOpen(false)}>
            Trending
          </Link>
          <Link
            href={ROUTE.MOST_POPULAR_BLOGS}
            onClick={() => setIsOpen(false)}
          >
            Most Popular
          </Link>
          <Link href={ROUTE.ABOUT} onClick={() => setIsOpen(false)}>
            About
          </Link>
          {hasMounted && user ? (
            <Link
              href={ROUTE.PROFILE}
              onClick={() => setIsOpen(false)}
              className="py-2 px-4 rounded-3xl bg-[#D4A373] text-white"
            >
              Profile
            </Link>
          ) : (
            <Link
              href={ROUTE.LOGIN}
              onClick={() => setIsOpen(false)}
              className="py-2 px-4 rounded-3xl bg-[#D4A373] text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link href={ROUTE.HOME}>Home</Link>
        <Link href={ROUTE.TRENDING_BLOGS}>Trending</Link>
        <Link href={ROUTE.MOST_POPULAR_BLOGS}>Most Popular</Link>
        <Link href={ROUTE.ABOUT}>About</Link>
        {hasMounted && user ? (
          <Link
            href={ROUTE.PROFILE}
            className="py-2 px-4 rounded-3xl bg-[#D4A373] text-white"
          >
            Profile
          </Link>
        ) : (
          <Link
            href={ROUTE.LOGIN}
            className="py-2 px-4 rounded-3xl bg-[#D4A373] text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
