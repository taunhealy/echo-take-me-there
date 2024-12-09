import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { PostCard } from "./PostCard";
import { PostsList } from "./PostsList";
import { Post } from "@/sanity.types";

export async function AllPosts() {
  const posts = await client.fetch(allPostsQuery);

  if (!posts?.length) return null;

  return (
    <PostsList>
      {posts.map((post: Post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </PostsList>
  );
}

export async function MorePosts({
  skip,
  limit,
}: {
  skip: string;
  limit: number;
}) {
  const posts = await client.fetch(allPostsQuery, {
    skip: typeof skip === "string" ? parseInt(skip, 10) : skip,
    limit,
  });

  if (!posts?.length) return null;

  return (
    <>
      <h2 className="mb-8 text-2xl font-bold">More Posts</h2>
      <PostsList>
        {posts.map((post: Post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </PostsList>
    </>
  );
}
