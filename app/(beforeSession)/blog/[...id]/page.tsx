"use client";
import IndividualBlog from "@/components/IndividualBlog";
import { useParams } from "next/navigation";
import React from "react";

const SingleBlog = () => {
  const { id } = useParams();
  if (!id) return null;
  return <IndividualBlog id={id[0]} />;
};

export default SingleBlog;
