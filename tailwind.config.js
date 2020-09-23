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
    colors: {
      purple: '#f0efff',
      darkPurple: '#6c63ff',
      black: '#000',
      yellow: '#fdea7b',
      grey: 'grey',
      lightgrey: '#d3d3d3'
    },
    extend: {
      inset: {
        16: '4rem',
        8: '2rem',
        4: '1rem',
        2: '0.5rem',
        '-40': '-10rem'
      },
      borderRadius: {
        '95': '0.95rem'
      },
      boxShadow: {
        'checkbox': 'inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.3)',
        'checkbox-checked': 'inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.1)'
      }
    },
  },
  variants: {
    backgroundColor: ['checked'],
    boxShadow: ['checked'],
    animation: ['hover', 'focus'],
  },
  plugins: [],
}
