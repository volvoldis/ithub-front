import { Stack, Title } from '@mantine/core';

import ErrorLogo from 'assets/svg/error.svg';
import classes from './ErrorBox.module.scss';

type ErrorBoxProps = {
  msg: string;
};

export default function ErrorBox({ msg }: ErrorBoxProps) {
  return (
    <Stack align='center' className={classes.error}>
      <ErrorLogo />
      <Title order={2}>{msg}</Title>
    </Stack>
  );
}
