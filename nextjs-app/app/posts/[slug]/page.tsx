import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, PortableTextBlock } from "next-sanity";

import { client } from "@/sanity/lib/client";
import { postQuery, postPagesSlugs } from "@/sanity/lib/queries";
import { Post } from "@/sanity.types";
import CoverImage from "@/app/components/CoverImage";
import { Suspense } from "react";
import { MorePosts } from "@/app/components/Posts";
import Avatar from "@/app/components/Avatar";

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await client.fetch(postPagesSlugs);
  return slugs.map((slug: string) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await client.fetch(postQuery, params);

  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

type Params = {
  params: { slug: string };
};

export default async function PostPage({ params }: Params) {
  const post = await client.fetch(postQuery, params);

  if (!post?._id) {
    return notFound();
  }

  return (
    <>
      <div className="">
        <div className="container my-12 lg:my-24 grid gap-12">
          <div>
            <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
              <div className="max-w-3xl flex flex-col gap-6">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                  {post.title}
                </h2>
              </div>
              <div className="max-w-3xl flex gap-4 items-center">
                {post.author &&
                  post.author.firstName &&
                  post.author.lastName && (
                    <Avatar person={post.author} date={post.date} />
                  )}
              </div>
            </div>
            <article className="gap-6 grid max-w-4xl">
              <div className="">
                <CoverImage image={post.coverImage} priority />
              </div>
              {post.content?.length && (
                <div className="max-w-2xl">
                  <PortableText value={post.content as PortableTextBlock[]} />
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="container my-12 lg:my-24 grid gap-12">
          <aside>
            <Suspense>
              <MorePosts skip={post._id} limit={2} />
            </Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
