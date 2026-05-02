// "use client";
// import React, { useRef, useState } from "react";

// export type AccordionItem = {
//     id: number;
//     title: React.ReactNode;
//     content: React.ReactNode;
// };

// type Props = {
//     items: AccordionItem[];
//     allowMultiple?: boolean;
//     scrollOffset?: number;
// };

// export const Accordion = ({
//     items,
//     allowMultiple = false,
//     scrollOffset = 0,
// }: Props) => {
//     const [open, setOpen] = useState<number | number[]>([]);
//     const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

//     const isOpen = (id: number) => {
//         return allowMultiple
//             ? (open as number[]).includes(id)
//             : open === id;
//     };

//     const toggle = (id: number) => {
//         if (allowMultiple) {
//             setOpen((prev) => {
//                 const arr = prev as number[];
//                 return arr.includes(id)
//                     ? arr.filter((i) => i !== id)
//                     : [...arr, id];
//             });
//         } else {
//             setOpen((prev) => (prev === id ? 0 : id));
//         }

//         // Optional scroll
//         if (scrollOffset) {
//             setTimeout(() => {
//                 const el = document.getElementById(`accordion-${id}`);
//                 if (el) {
//                     const y =
//                         el.getBoundingClientRect().top +
//                         window.pageYOffset -
//                         scrollOffset;

//                     window.scrollTo({
//                         top: y,
//                         behavior: "smooth",
//                     });
//                 }
//             }, 200);
//         }
//     };

//     return (
//         <div className="w-full space-y-3">
//             {items.map((item) => {
//                 const active = isOpen(item.id);

//                 return (
//                     <div
//                         id={`accordion-${item.id}`}
//                         key={item.id}
//                         className="border border-gray-200 rounded-xl overflow-hidden"
//                     >
//                         {/* Header */}
//                         <button
//                             onClick={() => toggle(item.id)}
//                             className="w-full flex items-center justify-between sm:p-4 p-2 text-left bg-gray-50"
//                         >
//                             <span className="font-semibold text-[var(--color-accent-purple)]">
//                                 {item.title}
//                             </span>

//                             <span className="w-6 h-6 flex items-center justify-center text-lg">
//                                 {active ? "−" : "+"}
//                             </span>
//                         </button>

//                         {/* Body */}
//                         <div
//                             ref={(el) => {
//                                 contentRefs.current[item.id] = el;
//                             }}
//                             style={{
//                                 height: active
//                                     ? contentRefs.current[item.id]?.scrollHeight
//                                     : 0,
//                             }}
//                             className="transition-all duration-300 overflow-hidden"
//                         >
//                             <div className="p-4 text-gray-600">
//                                 {item.content}
//                             </div>
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//     );
// };

"use client";
import React, { useRef, useState } from "react";

export type AccordionItem = {
    id: number;
    title: React.ReactNode;
    content: React.ReactNode;
};

type Props = {
    items: AccordionItem[];
    allowMultiple?: boolean;
    scrollOffset?: number;
};

export const Accordion = ({
    items,
    allowMultiple = false,
    scrollOffset = 100,
}: Props) => {
    const [open, setOpen] = useState<number | number[]>(allowMultiple ? [] : 0);
    const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const isOpen = (id: number) => {
        return allowMultiple
            ? (open as number[]).includes(id)
            : open === id;
    };

    const toggle = (id: number) => {
        const wasOpen = isOpen(id);
        
        if (allowMultiple) {
            setOpen((prev) => {
                const arr = prev as number[];
                return arr.includes(id)
                    ? arr.filter((i) => i !== id)
                    : [...arr, id];
            });
        } else {
            setOpen((prev) => (prev === id ? 0 : id));
        }

        // Scroll to the clicked accordion if it's being opened
        if (!wasOpen) {
            setTimeout(() => {
                const element = itemRefs.current[id];
                if (element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 100);
        }
    };

    return (
        <div className="w-full space-y-3">
            {items.map((item) => {
                const active = isOpen(item.id);

                return (
                    <div
                        id={`accordion-${item.id}`}
                        key={item.id}
                        ref={(el) => {
                            itemRefs.current[item.id] = el;
                        }}
                        className="border border-gray-200 rounded-xl overflow-hidden scroll-mt-24"
                    >
                        <button
                            onClick={() => toggle(item.id)}
                            className="w-full flex items-center justify-between sm:p-4 p-2 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <span className="font-semibold text-[var(--color-accent-purple)]">
                                {item.title}
                            </span>
                            <span className="w-6 h-6 flex items-center justify-center text-lg font-bold">
                                {active ? "−" : "+"}
                            </span>
                        </button>

                        {active && (
                            <div className="p-4 text-gray-600 border-t border-gray-100">
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};