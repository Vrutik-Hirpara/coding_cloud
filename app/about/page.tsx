import AboutClient from "@/component/AboutClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: "Learn more about Coding Cloud Institute.",
  path: "/about",
});

export default function Page() {
  return <AboutClient />;
}