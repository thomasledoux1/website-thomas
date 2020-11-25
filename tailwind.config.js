module.exports = {
  purge: [
    './pages/*.js',
    './components/*.js',
  ],
  darkMode: 'media',
  theme: {
    fontFamily: {
      display: ['Nunito', 'sans-serif'],
      body: ['Nunito', 'sans-serif'],
    },
    rotate: {
      0: '0',
      135: '135deg',
      '-135': '-135deg',
    },
    extend: {
      colors: {
        purple: '#F5EBFF',
        darkPurple: '#6c63ff',
        black: '#000',
        yellow: '#fdea7b',
        lightgrey: '#393e46',
        linkedIn: '#0076b5',
        facebook: '#1095f5',
        green: '#69BAA5',
        darkgrey: '#222831',
        whitedarktheme: '#EEEEEE',
        orange: '#b55400'
      },
      inset: {
        16: '4rem',
        8: '2rem',
        4: '1rem',
        2: '0.5rem',
        '-40': '-10rem',
        '-20': '-5rem',
        '-8': '-2rem',
        '1/2': '50%',
        'timelineCircle': 'calc(50% - 0.5em)'
      },
      borderRadius: {
        '95': '0.95rem'
      },
      boxShadow: {
        'checkbox': 'inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.3)',
        'checkbox-checked': 'inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.1)',
        'case': '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)',
        'case-hover': '0 10px 28px rgba(0,0,0,.25), 0 8px 10px rgba(0,0,0,.22)',
        'link': 'inset 0 -4px 0 #6c63ff',
        'link-hover': 'inset 0 -18px 0 #6c63ff',
        'link-dark': 'inset 0 -4px 0 #b55400',
        'link-dark-hover': 'inset 0 -18px 0 #b55400'
      },
      minHeight: {
        'screen-without-nav': 'calc(100vh - 4rem)'
      },
      maxHeight: {
        24: '6rem',
        20: '5rem',
      },
      maxWidth: {
        screen: '100vh',
        '80': '80%'
      }
    },
  },
  variants: {
    backgroundColor: ['checked', 'dark'],
    boxShadow: ['checked', 'hover', 'dark'],
    animation: ['hover', 'focus'],
    justifyContent: ['odd'],
    alignSelf: ['even'],
    padding: ['odd', 'even']
  },
  plugins: [],
}
