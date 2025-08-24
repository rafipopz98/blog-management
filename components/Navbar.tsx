"use client";
import React, { useEffect, useState } from "react";
import Image from "./Image";
import Link from "next/link";
import { ROUTE } from "@/helpers/routes";
import { useUser } from "@/hooks/use-user";
import useHasMounted from "@/hooks/has-mounted";
import { logout } from "@/helpers/projectHelpers";

const Navbar = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const hasMounted = useHasMounted();

  useEffect(() => {}, [user]);

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
          <Link href={ROUTE.ALL_BLOGS} onClick={() => setIsOpen(false)}>
            All Blogs
          </Link>
          <Link href={ROUTE.ABOUT} onClick={() => setIsOpen(false)}>
            About
          </Link>
          {hasMounted && user && user.user?.id ? (
            <>
              <Link
                href={ROUTE.PROFILE}
                onClick={() => setIsOpen(false)}
                className="py-2 px-4 rounded-3xl bg-orange-800 text-white"
              >
                Profile
              </Link>
              <div
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="py-2 px-4 rounded-3xl bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m-6 14h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Logout
              </div>
            </>
          ) : (
            <Link
              href={ROUTE.LOGIN}
              onClick={() => setIsOpen(false)}
              className="py-2 px-4 rounded-3xl bg-orange-800 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link href={ROUTE.HOME}>Home</Link>
        <Link href={ROUTE.ALL_BLOGS}>All Blogs</Link>
        <Link href={ROUTE.ABOUT}>About</Link>
        {hasMounted && user && user.user?.id ? (
          <>
            <Link
              href={ROUTE.PROFILE}
              className="py-2 px-4 rounded-3xl bg-orange-800 text-white"
            >
              Profile
            </Link>
            <div
              onClick={() => logout()}
              className="py-2 px-4 rounded-3xl bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m-6 14h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Logout
            </div>
          </>
        ) : (
          <Link
            href={ROUTE.LOGIN}
            className="py-2 px-4 rounded-3xl bg-orange-800 text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
