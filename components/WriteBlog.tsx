"use client";
import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { successToast, errorToast } from "@/helpers/projectHelpers";
import { blog } from "@/api/blogs/blog";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/helpers/routes";

const WriteBlog = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { mutateAsync, isPending } = blog.useCreateBlog();
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await mutateAsync({
        title,
        desc: description,
        category,
      });

      successToast({
        title: "Blog Published",
        msg: "Your blog post has been created successfully.",
      });

      console.log("Created Blog:", res);
      navigate.push(ROUTE.ALL_BLOGS);
    } catch (err: any) {
      console.error("Create blog error:", err);
      errorToast({
        title: "Failed to Publish",
        msg: err?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 px-4 md:px-12">
      <h1 className="text-2xl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select category</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <SunEditor
            setOptions={{
              height: "300",
              buttonList: [
                ["undo", "redo"],
                ["bold", "italic", "underline", "strike"],
                ["align", "list", "indent", "outdent"],
                ["codeView"],
              ],
            }}
            setContents={description}
            onChange={setDescription}
            placeholder="Write your blog content here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isPending ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
