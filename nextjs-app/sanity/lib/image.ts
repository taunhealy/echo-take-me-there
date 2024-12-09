import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

export const urlForImage = (source: any) =>
  createImageUrlBuilder(client).image(source);
