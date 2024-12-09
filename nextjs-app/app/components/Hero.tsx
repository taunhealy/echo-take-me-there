import { Image } from "next-sanity/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/utils";
import { Hero as HeroType } from "@/sanity.types";

type HeroProps = {
  block: HeroType;
};

export default function Hero({ block }: HeroProps) {
  return (
    <div className="relative isolate">
      {block.backgroundImage?.asset?._ref && (
        <div className="absolute inset-0 -z-10">
          <Image
            className="h-full w-full object-cover"
            fill={true}
            alt={block.backgroundImage?.alt || ""}
            src={
              urlForImage(block.backgroundImage)
                ?.height(800)
                .width(1920)
                .url() as string
            }
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
      )}

      <div className="container">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {block.heading}
            </h1>
            {block.tagline && (
              <p className="mt-6 text-lg leading-8 text-gray-300">
                {block.tagline}
              </p>
            )}
            {block.cta && (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href={block.cta.link}
                  className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                >
                  {block.cta.text}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
