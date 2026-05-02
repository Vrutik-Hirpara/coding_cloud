
import ContactClient from "@/component/ContactClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Coding Cloud Institute. Contact us for course details, training, and career guidance.",
  path: "/contact",
});

export default function Page() {
  return <ContactClient />;
}