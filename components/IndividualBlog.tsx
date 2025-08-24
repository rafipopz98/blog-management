"use client";
import React from "react";
import { format } from "timeago.js";
import Comments from "./Comments";
import { blog } from "@/api/blogs/blog";

const IndividualBlog = ({ id }: { id: string }) => {
  const { data } = blog.useGetSingleBlog(id.toString());
  const singleBlog = data?.data || {};

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className=" flex flex-col gap-8">
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
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default IndividualBlog;
