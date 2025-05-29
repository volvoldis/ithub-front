import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { Text } from '@mantine/core';
import classes from './Logo.module.scss';

export default function Logo() {
  return (
    <Link to={ROUTES.home} className={classes.link}>
      <Text>IT</Text>
      <Text c='white' className={classes.box}>
        hub
      </Text>
    </Link>
  );
}
