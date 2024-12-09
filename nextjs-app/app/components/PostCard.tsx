import Image from "next/image";
import Link from "next/link";
import { Post } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col items-start">
      <div className="relative w-full">
        <Image
          src={urlForImage(post.coverImage)?.url()}
          alt={post.title}
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          width={800}
          height={400}
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={post.date} className="text-gray-500">
            {new Date(post.date ?? Date.now()).toLocaleDateString()}
          </time>
          {post.status === "draft" && (
            <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
              Draft
            </span>
          )}
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/blog/${post.slug}`}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          {post.excerpt && (
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
