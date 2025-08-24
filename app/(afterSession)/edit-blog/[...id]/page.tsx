"use client";
import EditBlog from "@/components/EditBlog";
import { useParams } from "next/navigation";
import React from "react";

const CreateBlog = () => {
  const { id } = useParams();
  if (!id) return null;
  return (
    <div>
      <EditBlog id={id[0]} />
    </div>
  );
};

export default CreateBlog;
