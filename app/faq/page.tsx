// import FaqClient from "@/component/FaqClient";
// import { BASE_URL } from "@/lib/api";
// import { createMetadata } from "@/lib/seo";
// // const BASEURL = "https://codingcloudapi.codingcloud.co.in"

// export async function generateMetadata({ params }: any) {
//     const { slug } = await params; 

//   const res = await fetch(`${BASE_URL}/course/${slug}`);
//   const data = await res.json();

//   const course = data?.data?.[0] || data;

//   return createMetadata({
//     title: `${course?.name} FAQs`,
//     description: `Find answers to common questions about ${course?.name}.`,
//     path: `/courses/${slug}/faq`,
//   });
// }

// export default async function Page({ params }: any) {
//     const { slug } = await params; 
//   // 👉 get course to extract ID
//   const res = await fetch(`${BASE_URL}/course/${slug}`);
//   const data = await res.json();

//   const course = data?.data?.[0] || data;

//   return <FaqClient courseId={course?.id} />;
// }

import FaqClient from "@/component/FaqClient";
import { BASE_URL } from "@/lib/api";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic"; // ✅ fix build timeout

async function getCourse(slug: string) {
  const res = await fetch(`${BASE_URL}/course/${slug}`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data?.data?.[0] || data;
}

export async function generateMetadata({ params }: any) {
  const { slug } = params;

  const course = await getCourse(slug);

  return createMetadata({
    title: `${course?.name} FAQs`,
    description: `Find answers to common questions about ${course?.name}.`,
    path: `/courses/${slug}/faq`,
  });
}

export default async function Page({ params }: any) {
  const { slug } = params;

  const course = await getCourse(slug);

  return <FaqClient courseId={course?.id} />;
}