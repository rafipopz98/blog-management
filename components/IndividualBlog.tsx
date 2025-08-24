import React from "react";
import Image from "./Image";
import { format } from "timeago.js";
import Comments from "./Comments";

const IndividualBlog = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            data.title
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <div className="text-blue-800">data.user.username</div>
            <span>on</span>
            <div className="text-blue-800">data.category</div>
            <span>{format("2023-01-01")}</span>
          </div>
          <p className="text-gray-500 font-medium">data.desc</p>
          <div className="hidden lg:block w-2/5">
            <Image src="logo.png" w={600} className="rounded-2xl" />
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default IndividualBlog;
