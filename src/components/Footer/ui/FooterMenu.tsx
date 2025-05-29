import { Flex, Anchor } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';

import classes from './Footer.module.scss';

export default function FooterMenu() {
  const { t } = useTranslation();

  const menuConfig = [
    {
      value: t('about_us'),
      href: ROUTES.aboutUs,
    },
    {
      value: t('contacts'),
      href: ROUTES.contacts,
    },
    // {
    //   value: t('conditions'),
    //   href: ROUTES.conditions,
    // },
    {
      value: t('faq'),
      href: ROUTES.faq,
    },
  ];

  return (
    <Flex className={classes.menu}>
      {menuConfig.map(({ value, href }) => (
        <Anchor component={Link} key={value} to={href} underline='never'>
          {value}
        </Anchor>
      ))}
    </Flex>
  );
}
