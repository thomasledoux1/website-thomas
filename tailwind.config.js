module.exports = {
  purge: [
    './pages/*.js',
    './components/*.js',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
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
        purple: '#f0efff',
        darkPurple: '#6c63ff',
        black: '#000',
        yellow: '#fdea7b',
        grey: 'grey',
        lightgrey: '#d3d3d3'
      },
      inset: {
        16: '4rem',
        8: '2rem',
        4: '1rem',
        2: '0.5rem',
        '-40': '-10rem',
        '1/2': '50%'
      },
      borderRadius: {
        '95': '0.95rem'
      },
      boxShadow: {
        'checkbox': 'inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.3)',
        'checkbox-checked': 'inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.1)',
        'case': '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)',
        'case-hover': '0 10px 28px rgba(0,0,0,.25), 0 8px 10px rgba(0,0,0,.22)'
      },
      minHeight: {
        'screen-without-nav': 'calc(100vh - 4rem)'
      },
      maxHeight: {
        24: '6rem',
      }
    },
  },
  variants: {
    backgroundColor: ['checked'],
    boxShadow: ['checked', 'hover'],
    animation: ['hover', 'focus'],
  },
  plugins: [],
}
