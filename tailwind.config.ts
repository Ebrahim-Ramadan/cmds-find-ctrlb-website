import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  "./components/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'float-move': 'float-move 1s ease-out forwards',
      },
      keyframes: {
        'float-move': {
          '0%': { opacity: '0', transform: 'translate(0, 0) scale(0.5)' },
          '10%': { opacity: '1', transform: 'translate(0, -5px) scale(0.8)' },
          '50%': { opacity: '1', transform: 'translate(10px, -20px) scale(1.2)' },
          '90%': { opacity: '0.5', transform: 'translate(15px, -30px) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(20px, -40px) scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
