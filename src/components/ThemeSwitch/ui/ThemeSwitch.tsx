import {
  Button,
  useMantineColorScheme,
  useComputedColorScheme,
  rem,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export default function ThemeSwitch() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const isLightTheme = computedColorScheme === 'light';

  return (
    <Button
      onClick={() => setColorScheme(isLightTheme ? 'dark' : 'light')}
      size='xs'
      variant='outline'
      px={rem(8)}
      aria-label='Toggle color scheme'
    >
      {isLightTheme ? <IconSun size={14} /> : <IconMoonStars size={14} />}
    </Button>
  );
}
