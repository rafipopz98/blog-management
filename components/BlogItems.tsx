import React from "react";
import Image from "./Image";
import Link from "next/link";
import { format } from "timeago.js";
import { ROUTE } from "@/helpers/routes";

const BlogItems = ({ blog }: { blog: any }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* img */}
      <Image src={"logo.png"} className="rounded-2xl object-cover" w={300} />
      {/* content */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link href={`/${123}`} className="text-4xl font-semibold">
          {blog?.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <div className="text-blue-800">{blog?.user?.username}</div>
          <span>on</span>
          <div className="text-blue-800">{blog?.category}</div>
          <span>{format(blog?.createdAt)}</span>
        </div>
        <p
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: blog?.desc }}
        ></p>

        <Link
          href={`${ROUTE.BLOG}/${blog?._id}`}
          className="underline text-blue-800 text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogItems;
