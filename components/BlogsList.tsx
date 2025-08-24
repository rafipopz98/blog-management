import React, { useState } from "react";
import BlogItems from "./BlogItems";
import { blog } from "@/api/blogs/blog";

const limit = 2;

const btnClasses = (active: boolean, disabled: boolean) =>
  [
    "px-3 py-1 rounded transition font-medium",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    active
      ? "bg-orange-400 text-white"
      : "bg-orange-300 hover:bg-orange-400  text-gray-800",
  ].join(" ");

const BlogsList = () => {
  const [skip, setSkip] = useState(0);

  const { data, error, isLoading, isFetching } = blog.useGetAllBlogs({
    skip,
    limit,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  const blogs = data?.data.data || [];
  const total = data?.data?.total || 0;
  const hasMore = data?.data?.hasMore;

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setSkip((page - 1) * limit);
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {blogs?.map((blog: any) => (
        <BlogItems key={blog._id} blog={blog} />
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1 || isFetching}
            className={btnClasses(false, currentPage === 1 || isFetching)}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            const isDisabled = isActive || isFetching;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                disabled={isDisabled}
                className={btnClasses(isActive, isDisabled)}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages || isFetching || !hasMore}
            className={btnClasses(
              false,
              currentPage === totalPages || isFetching || !hasMore
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsList;
