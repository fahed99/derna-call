import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E19E20',
          100: '#1E3C63'
        },
        grey: {
          50: '#AAAAAA',
          100: '#3B434C'
        },
        pending: {
          DEFAULT: '#F9E7B9'
        },
        open: {
          DEFAULT: '#E7E1D3'
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
