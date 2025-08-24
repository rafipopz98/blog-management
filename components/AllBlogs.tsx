"use client";
import { blog } from "@/api/blogs/blog";
import React, { useState } from "react";
import BlogItems from "./BlogItems";

const limit = 5;

const AllBlogs = () => {
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortQuery, setSortQuery] = useState<string>("desc");

  const { data, error, isLoading, isFetching } = blog.useGetAllBlogs({
    skip,
    limit,
    category: category || undefined,
    searchQuery: searchQuery || undefined,
    sortQuery,
  });

  const blogs = data?.data?.data || [];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">All Categories</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
        </select>

        {/* Sort */}
        <select
          value={sortQuery}
          onChange={(e) => setSortQuery(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="desc">Latest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      {/* Blogs list */}
      <div>
        {isLoading || isFetching ? (
          <p>Loading...</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog: any) => <BlogItems key={blog._id} blog={blog} />)
        ) : (
          <p>No blogs found.</p>
        )}
      </div>

      {/* Pagination (optional, if backend supports) */}
      <div className="flex gap-4">
        <button
          disabled={skip === 0}
          onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={blogs.length < limit}
          onClick={() => setSkip((prev) => prev + limit)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBlogs;
