"use client";
import React, { useEffect, useState } from "react";
import BlogItems from "./BlogItems";
import { blog } from "@/api/blogs/blog";
import { successToast } from "@/helpers/projectHelpers";
import PasswordModal from "./PasswordModal";

const Profile = () => {
  const { data: profileData, refetch } = blog.useGetUserProfile();
  const { mutateAsync, isPending } = blog.useUpdateUserName();
  const { data } = blog.useGetUserBlogs();
  console.log(profileData, "profileData");
  const allBlogs = data?.data || [];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (profileData?.data) {
      setUsername(profileData.data.username);
      setEmail(profileData.data.email);
    }
  }, [profileData]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await mutateAsync({
      username,
    });
    refetch();
    successToast({
      title: "Username updated Successfully",
      msg: "You've updated your username successfully.",
    });
  };

  return (
    <div className="p-6 space-y-8">
      {/* Profile section */}
      <div className="bg-[#FAEDCD] p-6 rounded-2xl shadow-md">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold mb-6">Profile</h1>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-[#FA8072] text-white py-2 px-4 rounded-xl hover:bg-[#e06b5a] transition"
          >
            Change Password
          </button>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {/* Username (editable) */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border rounded-xl p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="bg-[#D4A373] text-white py-2 px-4 rounded-xl hover:bg-[#bf8753] transition cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>

      {/* Blogs section */}
      <div className="">
        <h1 className="text-xl font-semibold mb-6">My Blogs</h1>
        {allBlogs?.map((blog: any) => (
          <BlogItems key={blog._id} blog={blog} />
        ))}
      </div>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
