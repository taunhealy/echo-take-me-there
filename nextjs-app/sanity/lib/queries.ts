import { defineQuery, groq } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkFields = /* groq */ `
  link {
      ...,
      _type == "link" => {
        "page": page->slug.current,
        "post": post->slug.current
        }
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    ...,
    pageBuilder[]{
      ...,
      _type == "blogPosts" => {
        ...,
        "posts": *[_type == "post" && defined(slug.current)] | order(date desc) {
          ${postFields}
        }
      }
    } 
  }
`);

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(date desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    date
  }
`;

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    content,
    excerpt,
    coverImage,
    date,
    author->{
      firstName,
      lastName
    }
  }
`;

export const postPagesSlugs = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`;

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const blogPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    _id,
    "status": select(_originalId in path("drafts.**") => "draft", "published"),
    "title": coalesce(title, "Untitled"),
    "slug": slug.current,
    excerpt,
    coverImage,
    "date": coalesce(date, _updatedAt),
    "author": author->{firstName, lastName, picture}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post"] | order(date desc, _updatedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    date,
    author->{
      firstName,
      lastName
    }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"]{
    _id,
    title,
    description,
    image{
      asset->{
        _id,
        url
      }
    }
  }
`;
