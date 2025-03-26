/** @type {import('tailwindcss').Config} */
import { icons } from 'lucide-react';
import colors from 'tailwindcss/colors';

export default {
    darkMode: ["class"],
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        icons: 'rgb(183 176 163)',
        orangeRed: colors.orange[500],
        'light-orange': colors.orange[300],
        Wht: colors.white,
        'light-blue': '#1877F2',
        'dark-blue': '#0866ff',
        'main-bg': '#E5E3DF',
        'inp-bg': '#fafafa',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          hover: colors.orange[500],
          border: colors.orange[500],
          text: colors.orange[500],
          'text-hover': colors.neutral[50],
          foreground: 'hsl(var(--secondary-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: colors.neutral[200],
          text: colors.neutral[800],
          foreground: 'hsl(var(--primary-foreground))'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        'dancing-script': [
          'Dancing Script',
          'cursive'
        ]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};