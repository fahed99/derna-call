import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FDFDFD'
        },
        primary: {
          DEFAULT: '#E19E20',
          100: '#1E3C63'
        },
        grey: {
          50: '#F0F2F4',
          100: '#3B434C',
          700: '#3E4A5C'
        },
        pending: {
          DEFAULT: '#F9E7B9',
          text: '#D7AD44'
        },
        open: {
          DEFAULT: '#E7E1D3',
          text: '#969696'
        },
        resolved: {
          DEFAULT: '#B9F9C7',
          text: '#4FBA5A'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
};
export default config;
