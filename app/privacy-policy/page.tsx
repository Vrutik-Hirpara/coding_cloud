

import PrivacyPolicyClient from "@/component/PrivacyPolicyClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read Coding Cloud's privacy policy to understand how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

export default function Page() {
  return <PrivacyPolicyClient />;
}
