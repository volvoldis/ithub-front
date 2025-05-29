import { Outlet } from 'react-router-dom';
import { Stack, Center, Box } from '@mantine/core';
import { Footer, Logo } from 'components';
import classes from './Layout.module.scss';

export default function AuthLayout() {
  return (
    <Stack className={classes.layout}>
      <Box component='main' className={classes.main}>
        <Center>
          <Logo />
        </Center>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
}
