import type { Metadata } from "next";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/logos/logo.png",
}: SEOProps): Metadata {
//   const baseUrl = "https://codingcloud.co.in";

  return {
    title,
    description,

    alternates: {
      canonical: path,
    },

  };
}