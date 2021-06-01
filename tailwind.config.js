const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  purge: ['./pages/*.js', './components/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: '#F5EBFF',
        primary: 'var(--primary)',
        lightgrey: '#393e46',
        linkedIn: '#0076b5',
        darkgrey: 'var(--darkgray)',
        text: 'var(--text)',
        orange: '#b55400',
        yellow: 'var(--yellow)',
        blue: 'var(--blue)',
        secondary: 'var(--secondary)',
      },
      inset: {
        timelineCircle: 'calc(50% - 0.5em)',
      },
      boxShadow: {
        checkbox: 'inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.3)',
        'checkbox-checked': 'inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.1)',
        case: '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)',
        'case-hover': '0 10px 28px rgba(0,0,0,.25), 0 8px 10px rgba(0,0,0,.22)',
        link: 'inset 0 -4px 0 #6c63ff',
        'link-hover': 'inset 0 -18px 0 #6c63ff',
        'link-dark': 'inset 0 -4px 0 #b55400',
        'link-dark-hover': 'inset 0 -18px 0 #b55400',
      },
      minHeight: {
        'screen-without-nav': 'calc(100vh - 4rem)',
      },
      keyframes: {
        'title-part1': {
          '0%, 100%': {color: 'var(--text)'},
          '50%': {color: 'var(--primary)'},
        },
        'title-part2': {
          '0%, 100%': {color: 'var(--text)'},
          '50%': {color: 'var(--yellow)'},
        },
        'title-part3': {
          '0%, 100%': {color: 'var(--text)'},
          '50%': {color: 'var(--blue)'},
        },
      },
      animation: {
        'title-part1': 'title-part1 3s ease-in-out infinite',
        'title-part2': 'title-part2 3s ease-in-out 1s infinite',
        'title-part3': 'title-part3 3s ease-in-out 2s infinite',
      },
    },
  },
}
