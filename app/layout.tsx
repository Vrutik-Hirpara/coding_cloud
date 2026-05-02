

import "../index.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import type { Metadata } from "next";
import ScrollToTop from "@/component/ScrollToTop";
import WhatsAppButton from "@/component/ui/WhatsAppButton";
import { Suspense } from "react";
import Script from "next/script";



export const metadata: Metadata = {
  metadataBase: new URL("https://www.codingcloud.co.in"), // 🔁 change if different domain

  title: {
    default: "Coding Cloud",
    template: "%s | Coding Cloud",
  },

  description:
    "Ignite young minds with Coding Cloud courses. Learn coding, development, and technology skills with expert guidance.",

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "N_bFVuyjodaFPdQ7qzXfJ2_qgGHg4StTIMAvEdrVNOc",
  },

  icons: {
    icon: "../public/logos/logo.png",
    shortcut: "../public/logos/logo.png",
    apple: "../public/logos/logo.png",
  },


};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <script>(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NMG7DD6F');</script> */}


        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '905028305898515');
    fbq('track', 'PageView');`,
          }}
        />


        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Coding Cloud Institute",
              "url": "https://codingcloud.co.in/",
              "logo": "https://codingcloud.co.in/logo.png",
              "image": "https://codingcloud.co.in/logo.png",
              "description":
                "Coding Cloud Institute is a leading IT training institute offering Python, Data Science, Web Development, Flutter, Java, and MERN Stack courses with live project training and placement support.",

              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Polaris Building, Near Noble Hospital, Hadapsar",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "411028",
                "addressCountry": "IN"
              },

              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "18.5089",
                "longitude": "73.9260"
              },
              "telephone": [
                "+91-9998031661",
                "+91-6356723490"
              ],

              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-9998031661",
                  "contactType": "Customer Support",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-6356723490",
                  "contactType": "Customer Support",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              // "telephone": "+91-9998031661",

              // "contactPoint": {
              //   "@type": "ContactPoint",
              //   "telephone": "+91-9998031661",
              //   "contactType": "Customer Support",
              //   "areaServed": "IN",
              //   "availableLanguage": ["English", "Hindi"]
              // },

              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                "opens": "09:00",
                "closes": "20:00"
              },

              "sameAs": [
                "https://www.facebook.com/",
                "https://www.instagram.com/",
                "https://www.linkedin.com/"
              ],

              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "IT Courses",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "Python Web Development Course"
                  }
                ]
              }
            }),
          }}
        />

        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Which courses are available at Coding Cloud Institute?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "We offer Python, Data Science, Web Development, MERN Stack, Flutter, Java, and more."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide placement assistance?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Yes, we provide job assistance after course completion."
                  }
                }
              ]
            }),
          }}
        />

        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id=GTM-NMG7DD6F'+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NMG7DD6F');`,
          }}
        />

        <meta name="google-site-verification"
          content="N_bFVuyjodaFPdQ7qzXfJ2_qgGHg4StTIMAvEdrVNOc" />
      </head>
      <body className="bg-[var(--color-white)] text-[var(--color-dark)] overflow-x-hidden relative min-h-screen pt-[96px] sm:pt-[112px] md:pt-[128px]">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NMG7DD6F"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <ScrollToTop />

        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <main className="w-full">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />

      </body>
    </html>
  );
}