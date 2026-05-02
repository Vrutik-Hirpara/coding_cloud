



import HomeClient from "@/component/HomeClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Coding Cloud Institute",
  description:
    "Coding Cloud offers top IT courses like Python, MERN Stack, Data Science, Flutter, and more with practical training and placement support.",
  path: "/",
});

export default function Page() {
  return <HomeClient />;
}