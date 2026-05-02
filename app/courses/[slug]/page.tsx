import CourseDetailClient from "@/component/CourseDetailClient";
import { BASE_URL } from "@/lib/api";
import { createMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic"
//  const BASEURL = "https://codingcloudapi.codingcloud.co.in"

// 🔥 dynamic metadata
export async function generateMetadata({ params }: any) {
   const { slug } = await params; 
  // const { slug } = params;

  // 🔥 fetch course
  const res = await fetch(`${BASE_URL}/course/${slug}`, {
    cache: "no-store", // 🔥 important
  });
  const data = await res.json();

  const course = data?.data?.[0] || data;

  return createMetadata({
    title: course?.name,
    description: course?.short_description,
    path: `/courses/${slug}`,
    image: course?.banner_img || course?.image,
  });
}

export default async function Page({ params }: any) {
    const { slug } = await params; 
  return <CourseDetailClient slug={slug} />;
}