import cx from 'clsx';
import { Container } from '@mantine/core';
import classes from './Container.module.scss';

export const ContainerExt = Container.extend({
  classNames: (_, { size }) => ({
    root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
  }),
});
