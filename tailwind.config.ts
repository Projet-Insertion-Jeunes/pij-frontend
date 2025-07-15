import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/composants/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'guinea-red': '#B8202E',
        'guinea-yellow': '#E8C547', 
        'guinea-green': '#2D8659',
        'secondary-red': '#A31E2A',
        'secondary-yellow': '#D4B43E',
        'secondary-green': '#25714B',
        'light-gray': '#F8F9FA',
        'dark-gray': '#333333',
        'text-gray': '#666666',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'floating': 'floating 3s ease-in-out infinite',
      },
      keyframes: {
        floating: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      }, 
      fontFamily: {
        'segoe': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        'guinea': '0 10px 30px rgba(206, 17, 38, 0.1)',
      },
      backdropFilter: {
        'blur-10': 'blur(10px)',
      }
    },
  },
  plugins: [],
}
export default config
