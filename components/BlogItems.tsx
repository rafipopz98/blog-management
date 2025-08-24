import React from "react";
import Image from "./Image";
import Link from "next/link";
import { format } from "timeago.js";
import { ROUTE } from "@/helpers/routes";

const BlogItems = ({ blog }: { blog: any }) => {
  const decodeHTML = (html: string) => {
    if (typeof window !== "undefined") {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
    return html;
  };

  // Strip tags, decode HTML, and limit to 250 characters
  const getExcerpt = (html: string, limit = 250) => {
    const text = decodeHTML(html.replace(/<[^>]+>/g, ""));
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12 border border-orange-800 rounded-2xl p-4">
      {/* content */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link href={`/${123}`} className="text-4xl font-semibold">
          {blog?.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <div className="text-orange-800">{blog?.user?.username}</div>
          <span>on</span>
          <div className="text-orange-800">{blog?.category}</div>
          <span>{format(blog?.createdAt)}</span>
        </div>
        <p className="text-gray-600">{getExcerpt(blog?.desc || "", 250)}</p>

        <Link
          href={`${ROUTE.BLOG}/${blog?._id}`}
          className="underline text-orange-800 text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogItems;
