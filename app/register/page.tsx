import RegisterClient from "@/component/RegisterClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Register for Demo",
  description:
    "Register for a free demo class at Coding Cloud. Explore IT courses like Python, MERN Stack, Data Science, and more.",
  path: "/register",
});

export default function Page() {
  return <RegisterClient />;
}