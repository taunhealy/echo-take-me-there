import { notFound } from "next/navigation";
import { Suspense } from "react";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery } from "@/sanity/lib/queries";
import { Page as PageType } from "@/sanity.types";

export default async function Page() {
  const [{ data: page }] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params: { slug: "/" },
    }),
  ]);

  if (!page?._id) {
    return notFound();
  }

  return (
    <>
      <PageBuilderPage page={page as PageType} />
    </>
  );
}
