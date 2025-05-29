import { Card, Stack, Container, Title } from '@mantine/core';
import classes from './AuthTemplate.module.scss';

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function AuthTemplate({ title, children }: Props) {
  return (
    <Container size='responsive'>
      <Card withBorder className={classes.card}>
        <Stack gap='md' align='center'>
          <Title>{title}</Title>
          {children}
        </Stack>
      </Card>
    </Container>
  );
}
