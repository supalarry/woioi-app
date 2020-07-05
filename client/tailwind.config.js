module.exports = {
  theme: {
    extend: {
      fontSize: {
        '7xl': '5rem',
      },
      colors: {
        'pasta-yellow' : '#facb66',
        'wave-blue' : '#64a8f0',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
    // button can be hovered, and then active overrides. last element has most precedence
    // by default some utilities like background have responsive, focus etc,
    // but something like for hovering text it needs to be enabled
  },
  plugins: [],
}
