// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Award, CheckCircle, Star } from "lucide-react";

// import iao from "@/public/images/Accreditation/IAO.png";
// import iso from "@/public/images/Accreditation/ISO.png";
// import msme from "@/public/images/Accreditation/msme.png";

// const accreditations = [
//     {
//         id: 1,
//         name: "IAO",
//         logo: iao,
//         description: "International Accreditation Organization",
//         link: "https://www.iao.org/India-Gujarat/Coding-Cloud",
//     },
//     {
//         id: 2,
//         name: "ISO 9001:2015",
//         logo: iso,
//         description: "Quality Management System Certification",
//         link: "/images/Accreditation/Coding-Cloud-ISO_2024-25.jpg",
//     },
//     {
//         id: 3,
//         name: "MSME",
//         logo: msme,
//         description: "Ministry of Micro, Small & Medium Enterprises",
//         link: "https://codingcloudinstitute.com/wp-content/uploads/2024/10/Coding_Cloud_MSME_New.pdf",
//     },
// ];

// export default function Accreditation() {
//     return (
//         <section className="relative py-16 md:py-20 bg-gradient-to-b from-purple-50 via-white to-indigo-50 overflow-hidden">
//             <div className="container mx-auto px-6">

//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                     className="text-center max-w-3xl mx-auto mb-14"
//                 >
//                     <div className="flex justify-center mb-4">
//                         <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
//                             <Award className="w-4 h-4" />
//                             Accreditation
//                         </span>
//                     </div>

//                     <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                         Recognized & <span className="text-purple-600">Certified</span>
//                     </h2>

//                     <p className="text-gray-600 text-base md:text-lg">
//                         Coding Cloud is proudly accredited and recognized by reputed
//                         international and national certification bodies.
//                     </p>
//                 </motion.div>

//                 {/* Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {accreditations.map((item, index) => (
//                         <motion.div
//                             key={item.id}
//                             onClick={() => window.open(item.link, "_blank")}
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: index * 0.15 }}
//                             viewport={{ once: true }}
//                             whileHover={{ y: -8 }}
//                             className="group cursor-pointer"
//                         >
//                             <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 relative">

//                                 {/* Logo Circle */}
//                                 {/* Logo */}
//                                 <div className="flex justify-center">
//                                     <div className="relative w-[278px] h-[300px] 
//                   group-hover:scale-110 transition-transform duration-300">
//                                         <Image
//                                             src={item.logo}
//                                             alt={item.name}
//                                             fill
//                                             sizes="278px"
//                                             className="object-contain"
//                                             priority
//                                             unoptimized
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Name */}
//                                 <h3 className="text-lg md:text-xl font-semibold text-center text-gray-800 mb-2">
//                                     {item.name}
//                                 </h3>

//                                 {/* Description */}
//                                 <p className="text-gray-500 text-sm text-center">
//                                     {item.description}
//                                 </p>

//                                 {/* Verified Badge */}
//                                 {/* <div className="flex justify-center mt-5">
//                                     <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
//                                         <CheckCircle className="w-3 h-3" />
//                                         Verified
//                                     </span>
//                                 </div> */}
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Bottom Recognition */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     viewport={{ once: true }}
//                     className="mt-16 text-center"
//                 >
//                     <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
//                         <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                         <span className="text-sm text-gray-600 font-medium">
//                             Recognized by International Accreditation Bodies
//                         </span>
//                         <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                     </div>
//                 </motion.div>

//             </div>
//         </section>
//     );
// }




"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, CheckCircle, Star, ExternalLink, Shield, BadgeCheck } from "lucide-react";

import iao from "@/public/images/Accreditation/IAO.png";
import iso from "@/public/images/Accreditation/ISO.png";
import msme from "@/public/images/Accreditation/msme.png";
import Pill from "./ui/Pill";

const accreditations = [
    {
        id: 1,
        name: "IAO",
        logo: iao,
        description: "International Accreditation Organization",
        fullDesc: "Globally recognized accreditation body",
        link: "/images/IAO-CERTIFICATE.png",
        badge: "International",
        color: "from-blue-500 to-indigo-500",
        lightBg: "bg-blue-50",
        borderColor: "group-hover:border-blue-900",
        textColor: "text-blue-600",
        icon: Shield,
    },
    {
        id: 2,
        name: "ISO 9001:2015",
        logo: iso,
        description: "Quality Management System Certification",
        fullDesc: "International quality standard",
        link: "/images/ISO-CERTIFICATE.jpg",
        badge: "Quality",
        color: "from-emerald-500 to-teal-500",
        lightBg: "bg-emerald-50",
        borderColor: "group-hover:border-emerald-900",
        textColor: "text-emerald-600",
        icon: BadgeCheck,
    },
    {
        id: 3,
        name: "MSME",
        logo: msme,
        description: "Ministry of Micro, Small & Medium Enterprises",
        fullDesc: "Government of India recognition",
        link: "/images/MSME-CERTIFICATE.pdf",
        badge: "Government",
        color: "from-amber-500 to-orange-500",
        lightBg: "bg-amber-50",
        borderColor: "group-hover:border-amber-900",
        textColor: "text-amber-600",
        icon: Award,
    },
];



export default function Accreditation() {

    return (
        <section className="relative py-16 bg-gradient-to-b from-purple-50 via-white to-indigo-50 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-25"></div>

            <div className=" relative mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="flex justify-center">
                        <Pill
                            text="Accreditation"
                            textColor="var(--color-accent-purple)"
                            bgColor="var(--color-primary-light)"
                        />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Recognized & <span className="gradient-text">Certified</span>
                    </h2>

                    <p className="text-gray-600 text-lg">
                        Coding Cloud is proudly accredited and recognized by reputed
                        international and national certification bodies.
                    </p>
                </motion.div>

                {/* Certificate Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {accreditations.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                onClick={() => window.open(item.link, "_blank")}
                                className="group cursor-pointer"
                            >
                                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">

                                    {/* Certificate Ribbon */}
                                    {/* <div className={`absolute -top-2 -right-2 w-16 h-16 overflow-hidden`}>
                                        <div className={`absolute rotate-45 bg-gradient-to-r ${item.color} text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center shadow-lg`}>
                                            {item.badge}
                                        </div>
                                    </div> */}

                                    {/* Certificate Border Design */}
                                    <div className={`absolute inset-0 rounded-2xl border-2 border-dashed border-gray-200 ${item.borderColor} transition-colors duration-300 m-3`}></div>

                                    {/* Certificate Header */}
                                    <div className="relative flex justify-between items-start">
                                        <div className={`w-12 h-12 ${item.lightBg} rounded-xl flex items-center justify-center`}>
                                            <Icon className={`w-6 h-6 ${item.textColor}`} />
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-xs font-semibold ${item.textColor} bg-opacity-10 ${item.lightBg} px-3 py-1 rounded-full`}>
                                                #{item.badge}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Certificate Image/Logo */}
                                    <div className="relative mb-6 flex justify-center">
                                        <div className={`absolute inset-0 ${item.lightBg} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                                        <div className="relative w-[205px] h-[200px] group-hover:scale-105 transition-transform duration-300">
                                            <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-5 group-hover:opacity-5 rounded-full transition-opacity `}></div>
                                            <Image
                                                src={item.logo}
                                                alt={item.name}
                                                fill
                                                sizes="175px"
                                                className="object-cover  p-4"
                                                priority
                                                unoptimized
                                            />
                                        </div>
                                    </div>

                                    {/* Certificate Content */}
                                    <div className={`relative text-center border-t ${item.borderColor}   border-gray-100`}>
                                        <h3 className={`text-xl font-bold mb-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                            {item.name}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-2">
                                            {item.description}
                                        </p>

                                        <p className="text-gray-400 text-xs mb-4">
                                            {item.fullDesc}
                                        </p>

                                        {/* Certificate Footer */}
                                        <div className={`flex items-center justify-between text-xs text-gray-400 border-t ${item.borderColor}  border-gray-100 pt-4`}>
                                            <div className="flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3 text-green-500" />
                                                <span>Verified</span>
                                            </div>

                                            <div className="flex items-center gap-1 group-hover:text-purple-600 transition-colors">
                                                <span>View Certificate</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Shield className="w-3 h-3 text-gray-400" />
                                                <span>Valid</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Certificate Seal Effect */}
                                    {/* <div className={`absolute bottom-4 right-4 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity`}>
                                        <div className={`w-full h-full rounded-full bg-gradient-to-r ${item.color}`}></div>
                                    </div> */}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Recognition */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-gray-200">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-700 font-medium">
                            Trusted by 10,000+ Students • 50+ Placement Partners
                        </span>
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                </motion.div> */}

            </div>
        </section>
    );
}