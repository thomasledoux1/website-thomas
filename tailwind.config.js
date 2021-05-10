module.exports = {
  mode: 'jit',
  purge: ['./pages/*.js', './components/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: '#F5EBFF',
        darkPurple: '#665ffa',
        lightgrey: '#393e46',
        linkedIn: '#0076b5',
        facebook: '#1095f5',
        darkgrey: '#222831',
        whitedarktheme: '#EEEEEE',
        orange: '#b55400',
        facebook: '#4267B2',
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
    },
  },
}
