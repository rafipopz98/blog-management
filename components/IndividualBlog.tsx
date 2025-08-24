"use client";
import React, { useState } from "react";
import { format } from "timeago.js";
import Comments from "./Comments";
import { blog } from "@/api/blogs/blog";
import { useUser } from "@/hooks/use-user";
import { successToast } from "@/helpers/projectHelpers";
import { ROUTE } from "@/helpers/routes";
import { useRouter } from "next/navigation";

const IndividualBlog = ({ id }: { id: string }) => {
  const { data, refetch } = blog.useGetSingleBlog(id.toString());
  const { mutateAsync: featureToggle } = blog.useToggleFeatured(id);
  const { mutateAsync: deleteBlog } = blog.useDeleteBlog(id);
  const navigate = useRouter();

  const singleBlog = data?.data || {};

  const { user } = useUser();

  const isUserPublished = user?.id === singleBlog?.user?._id;
  const isAdmin = user?.role === "admin";

  const [isFeatured, setIsFeatured] = useState(singleBlog?.isFeatured || false);

  const handleToggleFeatured = async () => {
    setIsFeatured(!isFeatured);
    await featureToggle(id);
    refetch();
    successToast({
      title: "Blog updated Successfully",
      msg: "You've updated your blog successfully.",
    });
  };

  const handleEdit = () => {
    navigate.push(`${ROUTE.EDIT_BLOGS}/${id}`);
  };

  const handleDelete = async () => {
    const res = await deleteBlog(id);
    navigate.push(ROUTE.ALL_BLOGS);
    successToast({
      title: "Blog deleted Successfully",
      msg: "You've deleted the blog successfully.",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {singleBlog?.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <div className="text-orange-800">{singleBlog?.user?.username}</div>
            <span>on</span>
            <div className="text-orange-800">{singleBlog.category}</div>
            <span>{format(singleBlog?.createdAt)}</span>
          </div>
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: singleBlog?.desc }}
          ></p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            {/* Featured toggle only for admin */}
            {isAdmin && (
              <button
                className={`px-4 py-2 rounded ${
                  isFeatured
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={handleToggleFeatured}
              >
                {isFeatured ? "Featured On" : "Featured Off"}
              </button>
            )}

            {/* Edit button for admin or published user */}
            {(isAdmin || isUserPublished) && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}

            {/* Delete button for admin or published user */}
            {(isAdmin || isUserPublished) && (
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default IndividualBlog;
