"use client";

import Link from "next/link";
import { PostCard } from "@/app/components/PostCard";
import { PostsList } from "@/app/components/PostsList";

export default function RecentPosts({ posts }: { posts: any[] }) {
  if (!posts?.length) return null;

  return (
    <div className="container my-12">
      <div className="max-w-3xl mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Recent Posts
        </h2>
        <span className="block mt-4 text-lg uppercase font-light text-gray-900/70">
          Stay up to date with our latest articles
        </span>
      </div>
      <PostsList>
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </PostsList>
      <div className="mt-10 flex justify-center">
        <Link
          href="/posts"
          className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
