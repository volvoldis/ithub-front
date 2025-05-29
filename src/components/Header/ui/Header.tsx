import { Logo, MainMenu } from 'components';
import { Container, Grid, Box, Flex } from '@mantine/core';
import { AuthMenu, ProfileMenu } from 'features/user';
import classes from './Header.module.scss';

export default function Header() {
  return (
    <Box component='header' className={classes.wrap}>
      <Container size='responsive'>
        <Grid className={classes.inner} align='center'>
          <Grid.Col
            span={{ base: 4, xs: 3, sm: 2, md: 4, lg: 3 }}
            className={classes.logoCol}
          >
            <Logo />
          </Grid.Col>

          <Grid.Col span={{ base: 4, xs: 2, sm: 5, md: 4, lg: 6 }}>
            <MainMenu />
          </Grid.Col>

          <Grid.Col
            span={{ base: 4, xs: 7, sm: 5, md: 4, lg: 3 }}
            className={classes.userCol}
          >
            <Flex justify='flex-end'>
              <AuthMenu />
            </Flex>

            <Flex justify='flex-end'>
              <ProfileMenu />
            </Flex>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
