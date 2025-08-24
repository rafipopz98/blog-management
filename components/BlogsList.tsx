import React, { useState } from "react";
import BlogItems from "./BlogItems";
import { blog } from "@/api/blogs/blog";

const limit = 2;

const BlogsList = () => {
  const [skip, setSkip] = useState(0);

  const { data, error, isLoading, isFetching } = blog.useGetAllBlogs({
    skip,
    limit,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  const blogs = data?.data.data || [];
  const hasMore = data?.data?.hasMore;

  return (
    <div className="flex flex-col gap-8 mb-8">
      {blogs?.map((blog: any) => (
        <BlogItems key={blog._id} blog={blog} />
      ))}

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
          disabled={skip === 0 || isFetching}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setSkip((prev) => prev + limit)}
          disabled={!hasMore || isFetching}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogsList;
