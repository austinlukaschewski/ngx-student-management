const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
    // Note: this ensures TailwindCSS styles override Angular Material's
    important: true,
    darkMode: ['selector', '[data-mode="dark"]'],
    theme: {
        colors: {
            gray: {
                50: 'var(--gray-50)',
                100: 'var(--gray-100)',
                200: 'var(--gray-200)',
                300: 'var(--gray-300)',
                400: 'var(--gray-400)',
                500: 'var(--gray-500)',
                600: 'var(--gray-600)',
                700: 'var(--gray-700)',
                800: 'var(--gray-800)',
                900: 'var(--gray-900)',
                1000: 'var(--gray-1000)',
            },
        },
        fontFamily: {
            // TODO: Add Carrois Gothic SC?
            sans: ['"Inter"', '"Inter Tight"', 'sans-serif'],
        },
        screens: {
            'xs': '700px',
            'sm': '775px',
            'md': '900px',
            'lg': '1200px',
            'xl': '1800px',
          }
      
    },
    plugins: [
        plugin(({ addBase, theme }) =>
            addBase({
                h1: {
                    fontFamily: 'Inter Tight',
                    fontSize: theme('fontSize.3xl'),
                    fontWeight: theme('fontWeight.bold'),
                },
                h2: {
                    fontFamily: 'Inter Tight',
                    fontSize: theme('fontSize.2xl'),
                    fontWeight: theme('fontWeight.semibold'),
                },
                h3: {
                    fontFamily: 'Inter Tight',
                    fontSize: theme('fontSize.xl'),
                    fontWeight: theme('fontWeight.medium'),
                },
                h4: {
                    fontFamily: 'Inter Tight',
                    fontSize: theme('fontSize.lg'),
                },
                h5: {
                    fontFamily: 'Inter Tight',
                    fontWeight: theme('fontWeight.light'),
                },
                h6: {
                    fontFamily: 'Inter Tight',
                    fontSize: theme('fontSize.sm'),
                    fontWeight: theme('fontWeight.extralight'),
                },
            }),
        ),
    ],
};
