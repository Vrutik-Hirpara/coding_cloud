import TermsClient from "@/component/TermsClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Read the Terms of Service of Coding Cloud to understand the rules, policies, and conditions for using our courses and platform.",
  path: "/terms",
});

export default function Page() {
  return <TermsClient />;
}