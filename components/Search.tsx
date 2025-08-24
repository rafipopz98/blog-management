"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Search = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const query = e.target instanceof HTMLInputElement ? e.target.value : "";
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }

      if (pathname === "/posts") {
        router.replace(`${pathname}?${params.toString()}`);
      } else {
        router.push(`/posts?search=${query}`);
      }
    }
  };

  return (
    <div className="bg-gray-100 px-3 py-2 rounded-full flex items-center gap-2">
      {/* search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>

      {/* input */}
      <input
        type="text"
        placeholder="Search a blog..."
        className="bg-transparent outline-none w-full text-sm"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;
