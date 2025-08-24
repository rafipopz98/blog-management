"use client";
import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { successToast, errorToast } from "@/helpers/projectHelpers";
import { blog } from "@/api/blogs/blog";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/helpers/routes";

interface EditBlogProps {
  id: string;
}

const EditBlog = ({ id }: EditBlogProps) => {
  console.log(id);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { data } = blog.useGetSingleBlog(id);
  const { mutateAsync: updateBlog, isPending } = blog.useUpdateBlog({
    id,
    category,
    title,
    desc: description,
  });
  const navigation = useRouter();

  useEffect(() => {
    if (data?.data) {
      const singleBlog = data.data;
      setTitle(singleBlog.title);
      setCategory(singleBlog.category);
      setDescription(singleBlog.desc);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateBlog({
        id,
        title,
        desc: description,
        category,
      });

      successToast({
        title: "Blog Updated",
        msg: "Your blog post has been updated successfully.",
      });

      navigation.push(ROUTE.ALL_BLOGS);
    } catch (err: any) {
      console.error("Update blog error:", err);
      errorToast({
        title: "Failed to Update",
        msg: err?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 px-4 md:px-12">
      <h1 className="text-2xl font-light">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
            className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
          className="bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
