import { Flex, Text, Box, ActionIcon, Drawer } from '@mantine/core';
import {
  IconFileCv,
  IconListCheck,
  IconBuilding,
  IconChartDots,
  IconMenu2,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

import { ROUTES } from 'shared/routes';
import { NavLink } from 'react-router-dom';
import classes from './MainMenu.module.scss';

export default function MainMenu() {
  const [opened, { open, close }] = useDisclosure(false);

  const { t } = useTranslation();

  const configMenu = [
    {
      key: t('companies'),
      href: ROUTES.companies,
      icon: <IconBuilding size={24} />,
    },
    {
      key: t('jobs'),
      href: ROUTES.jobs,
      icon: <IconListCheck size={24} />,
    },
    {
      key: t('candidates'),
      href: ROUTES.resumes,
      icon: <IconFileCv size={24} />,
    },
    {
      key: t('statistics'),
      href: ROUTES.statistics,
      icon: <IconChartDots size={24} />,
    },
  ];

  const navLinkClasse = ({ isActive }: { isActive: boolean }): string =>
    `${classes.link} ${isActive ? classes.active : ''}`;

  const menu = configMenu.map((item) => (
    <NavLink
      key={item.key}
      to={item.href}
      onClick={close}
      className={navLinkClasse}
    >
      <Flex className={classes.innerLink}>
        {item.icon}
        <Text>{item.key}</Text>
      </Flex>
    </NavLink>
  ));

  return (
    <>
      <ActionIcon
        className={classes.burger}
        variant='transparent'
        size='xl'
        onClick={open}
      >
        <IconMenu2 size={36} stroke={1.5} />
      </ActionIcon>

      <Box className={classes.desktopMenu}>
        <Flex className={classes.menu}>{menu}</Flex>
      </Box>

      <Drawer opened={opened} onClose={close} size='100%'>
        <Flex className={classes.menu}>{menu}</Flex>
      </Drawer>
    </>
  );
}
