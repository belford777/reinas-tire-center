import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0B0B0F',
        primary: '#141417',
        'primary-light': '#1B1B1F',
        'accent-silver': '#C0C8D4',
        'accent-chrome': '#E8ECF1',
        'accent-gold': '#D4A853',
        'accent-red': '#E63946',
        'accent-red-dark': '#C1121F',
        white: '#FFFFFF',
        'text-muted': '#8892A4',
        'bg-card': '#141417',
        border: '#2A2A2F',
        success: '#34D399',
        danger: '#E63946',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-source-sans)', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
      borderRadius: {
        card: '6px',
        button: '4px',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 168, 83, 0.3)',
        'gold-glow-sm': '0 0 12px rgba(212, 168, 83, 0.25)',
        'red-glow': '0 0 15px rgba(230, 57, 70, 0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
