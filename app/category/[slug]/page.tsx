import CategoryCoursesClient from "@/component/CategoryCoursesClient";
import { BASE_URL } from "@/lib/api";
import { createMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic"
//  const BASEURL = "https://codingcloudapi.codingcloud.co.in"

// 🔥 dynamic reusable SEO
export async function generateMetadata({ params }: any) {
   const { slug } = await params; 

  // optional API call (better)
  const res = await fetch(`${BASE_URL}/category/${slug}`);
  const data = await res.json();

  const name =
    data?.data?.[0]?.category_details?.name ||
    slug.replace("-", " ");

  return createMetadata({
    title: `${name} Courses`,
    description: `Explore ${name} courses at Coding Cloud with practical training and career support.`,
    path: `/courses/category/${slug}`,
  });
}

export default async function Page({ params }: any) {
    const { slug } = await params; 
  return <CategoryCoursesClient slug={slug} />;
}