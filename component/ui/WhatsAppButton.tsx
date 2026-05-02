// 'use client';

// import React from 'react';
// import { FaWhatsapp } from 'react-icons/fa';

// const WhatsAppButton = () => {
//   const phoneNumber = "9998031661"; // Replace with your number (e.g., "14155552671")
//   const message = "Hello, I have a question!";

//   const handleWhatsAppClick = () => {
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     const encodedMessage = encodeURIComponent(message);

//     if (isMobile) {
//       // Opens the WhatsApp app if installed on mobile
//       window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`);
//     } else {
//       // Opens WhatsApp Web on desktop
//       window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
//     }
//   };

//   return (
//     <button
//       onClick={handleWhatsAppClick}
//       className="fixed bottom-2 right-2  z-[9999] bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
//       aria-label="Chat on WhatsApp"
//     >
//       <FaWhatsapp size={32} />
//     </button>
//   );
// };

// export default WhatsAppButton;


'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = "9998031661"; // Replace with your number (e.g., "14155552671")

  const handleWhatsAppClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Opens the WhatsApp app if installed on mobile
      window.open(`whatsapp://send?phone=${phoneNumber}`);
    } else {
      // Opens WhatsApp Web on desktop
      window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}`, '_blank');
    }
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-12 right-12  z-[99999] bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </button>
  );
};

export default WhatsAppButton;