import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Overused Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['"Overused Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT:   '#F2F2F0',
          secondary: '#EAEAE7',
          widget:    '#FFFFFF',
          dark:      '#141414',
        },
        text: {
          primary:   '#141414',
          secondary: '#6B6B6B',
          tertiary:  '#9B9B9B',
          inverse:   '#F2F2F0',
        },
        accent: {
          DEFAULT: '#6366F1',
          hover:   '#4F52D4',
        },
        highlight: '#F5E642',
        border: {
          DEFAULT: '#E2E2DF',
          strong:  '#C8C8C4',
        },
        available: '#22C55E',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight:   '-0.02em',
        normal:  '0em',
        wide:    '0.06em',
        wider:   '0.10em',
        widest:  '0.14em',
      },
      lineHeight: {
        tight:  '1.1',
        snug:   '1.25',
        normal: '1.5',
        relaxed:'1.7',
      },
      borderRadius: {
        sm:   '6px',
        md:   '12px',
        lg:   '18px',
        xl:   '24px',
        '2xl':'32px',
      },
      boxShadow: {
        sm:     '0 1px 3px rgba(20,20,20,0.06), 0 1px 2px rgba(20,20,20,0.04)',
        md:     '0 4px 16px rgba(20,20,20,0.08), 0 2px 6px rgba(20,20,20,0.04)',
        lg:     '0 12px 40px rgba(20,20,20,0.10), 0 4px 12px rgba(20,20,20,0.06)',
        widget: '0 2px 12px rgba(20,20,20,0.07), 0 1px 3px rgba(20,20,20,0.05)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast:   '150ms',
        base:   '250ms',
        slow:   '400ms',
        spring: '500ms',
      },
    },
  },
  plugins: [],
}

export default config
