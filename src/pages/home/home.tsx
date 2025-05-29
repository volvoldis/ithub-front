import { Container, Flex, Title, Text, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import IntroLogo from 'assets/svg/intro.svg';

import classes from './Home.module.scss';

function HomePage() {
  const { t } = useTranslation();

  return (
    <Box component='section' className={classes.intro}>
      <Container size='responsive'>
        <Flex className={classes.inner}>
          <IntroLogo className={classes.icon} />
          <Title order={1} className={classes.title}>
            {t('find_a_dream_job_in_it')}
          </Title>
          <Text className={classes.subtitle} c='secondary'>
            {t('searching_for_a_job')}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default HomePage;
