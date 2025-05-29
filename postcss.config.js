module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em', // 576px
        'mantine-breakpoint-sm': '48em', // 768
        'mantine-breakpoint-md': '62em', // 992
        'mantine-breakpoint-lg': '75em', // 1200
        'mantine-breakpoint-xl': '100em', // 1600
      },
    },
  },
};
