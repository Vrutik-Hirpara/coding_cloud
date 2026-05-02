// import Swal from "sweetalert2";

// export const showApiErrors = (errors: any) => {
//   if (!errors) return;

//   let message = "";

//   Object.keys(errors).forEach((key) => {
//     if (Array.isArray(errors[key])) {
//       message += `${errors[key].join(", ")}\n`;
//     } else {
//       message += `${errors[key]}\n`;
//     }
//   });

//   Swal.fire({
//     icon: "error",
//     title: "Validation Error",
//     text: message.trim(),
//     customClass: {
//     popup: "z-[10000]" // 🔥 higher than modal
//   }
//   });
// };

import Swal from "sweetalert2";

export const showApiErrors = (errors: any) => {
  if (!errors) return;

  let message = "";

  if (typeof errors === "string") {
    message = errors;
  } else {
    Object.keys(errors).forEach((key) => {
      if (Array.isArray(errors[key])) {
        message += `${errors[key].join(", ")}\n`;
      } else {
        message += `${errors[key]}\n`;
      }
    });
  }

  Swal.fire({
    icon: "error",
    title: "Validation Error",
    text: message.trim(),
    customClass: {
      popup: "z-[10000]" // 🔥 higher than modal
    }
  });
};