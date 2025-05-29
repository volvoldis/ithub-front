import { Link } from 'react-router-dom';
import { Flex, Avatar, Text, Menu, Divider, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import {
  IconFileCv,
  IconUserScan,
  IconEdit,
  IconListCheck,
  IconListTree,
  IconLogout,
  IconBuilding,
  IconFileDots,
} from '@tabler/icons-react';
import { ROLES, API_SERVER } from 'shared/constants';
import { ChatLink } from 'features/chats';
import { NotificationLink } from 'features/notifications';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { ROUTES } from 'shared/routes';

import { selectIsAuthorized, selectUser, logout } from '../../userSlice';

export default function ProfileMenu() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isAuthorized = useAppSelector(selectIsAuthorized);
  const user = useAppSelector(selectUser);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const seekerConfig = [
    {
      title: t('profile'),
      href: ROUTES.profile,
      icon: <IconUserScan size={20} />,
    },
    {
      title: t('resume'),
      href: ROUTES.profileResume,
      icon: <IconFileCv size={20} />,
    },
    {
      title: t('my_applications'),
      href: ROUTES.profileApplications,
      icon: <IconListTree size={20} />,
    },
  ];

  const employerConfig = [
    {
      title: t('profile'),
      href: ROUTES.profile,
      icon: <IconUserScan size={20} />,
    },
    {
      title: t('company'),
      href: ROUTES.profileCompany,
      icon: <IconBuilding size={20} />,
    },
    {
      title: t('docs'),
      href: ROUTES.profileCompanyDocs,
      icon: <IconFileDots size={20} />,
    },
    {
      title: t('vacancies'),
      href: ROUTES.profileVacancies,
      icon: <IconListCheck size={20} />,
    },
    {
      title: t('create_vacancy'),
      href: ROUTES.profileAddEditVacancy,
      icon: <IconEdit size={20} />,
    },
  ];

  const menuConfig =
    user?.role === ROLES.seeker ? seekerConfig : employerConfig;

  if (isAuthorized) {
    return (
      <Flex gap={{ base: rem(4), xs: rem(12) }} align='center'>
        <NotificationLink />
        <ChatLink />
        <Menu trigger='click-hover'>
          <Menu.Target>
            <Avatar src={`${API_SERVER}/${user?.avatar}`} />
          </Menu.Target>
          <Menu.Dropdown>
            <Text size='md' ta='center' p={rem(4)} fw='bold'>
              {user?.firstName} {user?.lastName}
            </Text>
            <Divider my={rem(4)} />
            {menuConfig?.map(({ title, icon, href }) => (
              <Menu.Item
                key={title}
                leftSection={icon}
                component={Link}
                to={href}
              >
                {title}
              </Menu.Item>
            ))}
            <Divider my={rem(4)} />
            <Menu.Item
              color='red'
              onClick={logoutHandler}
              leftSection={<IconLogout size={20} />}
            >
              {t('logout')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    );
  }
  return null;
}
