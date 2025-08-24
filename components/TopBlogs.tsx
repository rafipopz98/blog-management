import React from "react";
import Link from "next/link";
import { format } from "timeago.js";
import { blog } from "@/api/blogs/blog";
import { ROUTE } from "@/helpers/routes";

const TopBlogs = () => {
  const { data } = blog.useGetFeaturedBlogs();
  const blogs = data?.data || [];
  if (!blogs.length) return null;

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
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First (Main) Blog */}
      {blogs[0] && (
        <div className="w-full lg:w-1/2 flex flex-col gap-4 border border-orange-800 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold lg:text-lg">01.</h1>

            <div className="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap">
              <span>By</span>
              <div className="text-orange-800">{blogs[0]?.user?.username}</div>
              <span>on</span>
              <div className="text-orange-800">{blogs[0].category}</div>
              <span>{format(blogs[0]?.createdAt)}</span>
            </div>
          </div>
          <Link
            href={`${ROUTE.BLOG}/${blogs[0]._id}`}
            className="text-xl lg:text-3xl font-semibold lg:font-bold"
          >
            {blogs[0].title}
          </Link>
          <p className="text-gray-600 text-justify">
            {getExcerpt(blogs[0]?.desc || "", 250)}
          </p>
          <Link
            href={`${ROUTE.BLOG}/${blogs[0]._id}`}
            className="underline text-orange-800 text-sm"
          >
            Read More
          </Link>
        </div>
      )}

      {/* Remaining Blogs */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {blogs.slice(1, 4).map((blog: any, index: number) => (
          <div
            key={blog._id}
            className="lg:h-1/3 flex justify-between gap-4 border border-orange-800 rounded-xl p-2"
          >
            <div className="w-2/3">
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">
                  {String(index + 2).padStart(2, "0")}.
                </h1>
                <div className="flex items-center gap-2 text-gray-400 text-xs whitespace-nowrap">
                  <span>By</span>
                  <div className="text-orange-800">{blog?.user?.username}</div>
                  <span>on</span>
                  <div className="text-orange-800">{blog.category}</div>
                  <span>{format(blog?.createdAt)}</span>
                </div>
              </div>
              <Link
                href={`${ROUTE.BLOG}/${blog._id}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {blog.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBlogs;
