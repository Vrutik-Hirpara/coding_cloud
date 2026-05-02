// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./component/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("@tailwindcss/typography")],
// };


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./component/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         'sm': '640px',
//         'md': '768px',
//         'lg': '1024px',
//         'xl': '1240px',  // 1240px and above (tamari requirement)
//         '2xl': '1536px', // (optional - specific 1536px+ styling mate)
//         '3xl': '1920px', // (optional - specific 1920px+ styling mate)
//       }
//     },
//   },
//   plugins: [require("@tailwindcss/typography")],
// };

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./component/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         'sm': '640px',
//         'md': '768px',
//         'lg': '1024px',
//         'xl': '1240px',
//         '2xl': '1536px',
//         '3xl': '1920px',
//       },
//       animation: {
//         marquee: 'marquee 10s linear infinite',
//       },
//       keyframes: {
//         marquee: {
//           '0%': { transform: 'translateX(0)' },
//           '100%': { transform: 'translateX(-50%)' },
//         }
//       }
//     },
//   },
//   plugins: [require("@tailwindcss/typography")],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1240px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      animation: {
        marquee: 'marquee 10s linear infinite',
        blob: 'blob 7s infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },

        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },

        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};