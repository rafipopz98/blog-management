"use client";
import React, { useState } from "react";
import BlogItems from "./BlogItems";

const Profile = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [email] = useState("johndoe@example.com");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated username:", username);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Profile section */}
      <div className="bg-[#FAEDCD] p-6 rounded-2xl shadow-md">
        <h1 className="text-xl font-semibold mb-6">Profile</h1>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {/* Username (editable) */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        {/* <BlogItems />
        <BlogItems />
        <BlogItems />
        <BlogItems />
        <BlogItems />
        <BlogItems />
        <BlogItems />
        <BlogItems /> */}
      </div>
    </div>
  );
};

export default Profile;
