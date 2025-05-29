import { createTheme, MantineColorsTuple } from '@mantine/core';
import { ContainerExt } from './components/Container/Container';

const primary: MantineColorsTuple = [
  '#eef3ff',
  '#dce4f5',
  '#b9c7e2',
  '#94a8d0',
  '#748dc1',
  '#5f7cb8',
  '#5474b4',
  '#44639f',
  '#39588f',
  '#2d4b81',
];

const secondary: MantineColorsTuple = [
  '#f3f4f6',
  '#e5e5e6',
  '#c8c9cc',
  '#aaacb4',
  '#8f929f',
  '#7e8292',
  '#757a8e',
  '#64687b',
  '#585d6e',
  '#4a5063',
];

const bg: MantineColorsTuple = [
  '#f2f3f7',
  '#e3e4e8',
  '#c4c6d1',
  '#a3a6bb',
  '#090b0e',
  '#12141D',
  '#6a7299',
  '#5a6185',
  '#4f5678',
  '#424a6b',
];

export const theme = createTheme({
  fontFamily: 'Rubik, sans-serif',
  colors: {
    primary,
    secondary,
    bg,
  },
  black: '#12141D',
  primaryColor: 'primary',
  primaryShade: { light: 6, dark: 8 },
  breakpoints: {
    xs: '36em', // 576
    sm: '48em', // 768
    md: '62em', // 992
    lg: '75em', // 1200
    xl: '100em', // 1600
  },
  headings: {
    fontFamily: 'Poppins, sans-serif',
    sizes: {
      // h1: { fontSize: rem(88) },
    },
  },
  components: {
    Container: ContainerExt,
  },
});
