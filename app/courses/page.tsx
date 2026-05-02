import CoursesClient from "@/component/CoursesClient ";
import { createMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = createMetadata({
  title: "All Courses",
  description:
    "Explore all Coding Cloud courses including Python, MERN Stack, Data Science, Flutter, Java, and more with practical training and career support.",
  path: "/courses",
});

// export default function Page() {
//   return <CoursesClient />;
// }
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoursesClient />
    </Suspense>
  );
}