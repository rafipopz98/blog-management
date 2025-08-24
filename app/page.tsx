"use client";
import { ROUTE } from "@/helpers/routes";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import React from "react";

const App = () => {
  const user = useUser();

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6">
      {/* breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
        <Link href={ROUTE.HOME} className="hover:underline whitespace-nowrap">
          Home
        </Link>
        <span className="select-none">•</span>
        <span className="text-orange-700 font-medium whitespace-nowrap">
          Blogs
        </span>
      </div>

      {/* hero */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            Discover stories, ideas, and insights from our community.
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Start reading or share your own perspective.
          </p>
        </div>

        <div className="flex justify-center sm:justify-end whitespace-nowrap">
          <Link
            href={ROUTE.CREATE_BLOG}
            className="px-5 py-2 text-sm sm:text-base bg-orange-700 text-white rounded-full hover:bg-orange-800 transition"
          >
            Write Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
