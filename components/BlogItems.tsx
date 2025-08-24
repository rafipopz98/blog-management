import React from "react";
import Image from "./Image";
import Link from "next/link";
import { format } from "timeago.js";

const BlogItems = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* img */}
      <Image src={"logo.png"} className="rounded-2xl object-cover" w={300} />
      {/* content */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link href={`/${123}`} className="text-4xl font-semibold">
          blog title
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <div className="text-blue-800">post.user.username</div>
          <span>on</span>
          <div className="text-blue-800">post.category</div>
          <span>{format("2023-01-01")}</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          deleniti reiciendis odio quos quae inventore ipsum amet magni
          excepturi quas, minima, ea veniam harum optio placeat quam quis atque
          rem consequuntur. Error, a. Ullam, laboriosam temporibus. Quasi fugit
          impedit rem totam architecto quaerat consectetur itaque aliquid!
          Dignissimos, expedita natus! Perspiciatis.
        </p>
        <Link href={`/${123}`} className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogItems;
