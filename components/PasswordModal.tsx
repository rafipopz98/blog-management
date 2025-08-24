"use client";
import React, { useState } from "react";
import { blog } from "@/api/blogs/blog";
import { successToast, errorToast } from "@/helpers/projectHelpers";

const PasswordModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: resetPassword } = blog.useResetPassword();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res: any = await resetPassword({ oldPassword, newPassword });
    successToast({
      title: "Password updated Successfully",
      msg: "You've updated your password successfully.",
    });
    setIsSubmitting(false);
    setNewPassword("");
    setOldPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-500 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#D4A373] text-white py-2 px-4 rounded-xl hover:bg-[#bf8753] transition disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
