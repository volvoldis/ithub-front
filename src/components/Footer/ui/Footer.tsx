import { Container, Grid, Text, Box, Group, rem } from '@mantine/core';
import { LangSwitch, ThemeSwitch } from 'components';

import FooterMenu from './FooterMenu';
import classes from './Footer.module.scss';

export default function RootFooter() {
  return (
    <Box component='footer'>
      <Container size='responsive'>
        <Grid className={classes.footer} align='center'>
          <Grid.Col
            order={{ base: 2, sm: 1 }}
            span={{ base: 6, sm: 2 }}
            className={classes.copyrightCol}
          >
            <Text size='sm'>IThub @ 2024</Text>
          </Grid.Col>
          <Grid.Col order={{ sm: 2 }} span={{ base: 12, sm: 8 }}>
            <FooterMenu />
          </Grid.Col>
          <Grid.Col
            order={{ base: 3 }}
            span={{ base: 6, sm: 2 }}
            className={classes.btnsCol}
          >
            <ThemeSwitch />
            <LangSwitch />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
