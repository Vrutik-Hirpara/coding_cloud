import BlogDetailClient from "@/component/BlogDetailClient";
import { BASE_URL } from "@/lib/api";
import { createMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic"
//  const BASEURL = "https://codingcloudapi.codingcloud.co.in"
// 🔥 reusable dynamic metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params; 
  const res = await fetch(`${BASE_URL}/blogs/${slug}`);
  const data = await res.json();

  const blog = data?.data || data;

  return createMetadata({
    title: blog?.title,
    description: blog?.short_description,
    path: `/blogs/${slug}`,
    image: blog?.featured_image,
  });
}

export default async function Page({ params }: any) {
   const { slug } = await params; 
  return <BlogDetailClient slug={slug} />;
}