import BlogsClient from "../../component/BlogsClient";

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blogs",
  description: "Read latest blogs on coding and technology.",
  path: "/blogs",
});
export default function Page() {
  return <BlogsClient />;
}