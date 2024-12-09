import { client } from "@/sanity/lib/client";
import { recentPostsQuery } from "@/sanity/lib/queries";

export async function fetchRecentPosts(numberOfPosts: number) {
  return await client.fetch(recentPostsQuery, { limit: numberOfPosts });
}
