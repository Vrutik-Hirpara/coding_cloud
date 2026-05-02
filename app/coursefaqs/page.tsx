import CourseFaqsClient from "@/component/CourseFaqsClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Course FAQs",
  description:
    "Find answers to frequently asked questions about Coding Cloud courses including Python, MERN, Data Science, and more.",
  path: "/course-faqs",
});

export default function Page() {
  return <CourseFaqsClient />;
}