import {
  Card,
  Text,
  Badge,
  Image,
  Stack,
  Flex,
  Title,
  Box,
  rem,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import {
  IconMapPin,
  IconCrown,
  IconChartBar,
  IconLanguage,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { API_SERVER, DEFAULT_AVATAR } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import classes from './ResumeCard.module.scss';

import { IResume, ISeekerAccount } from '../../../types';

type ResumeCardProps = {
  resume: IResume;
};

export default function ResumeCard({ resume }: ResumeCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    position,
    salaryExpectations,
    country,
    city,
    workExperience,
    experienceLevel,
    owner,
    englishLevel,
  } = resume;

  const { avatar, firstName, lastName, searchStatus } = owner as ISeekerAccount;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateHandler = () => {
    navigate(`${ROUTES.resumes}/${_id}`);
  };

  return (
    <Card
      shadow='sm'
      radius={0}
      className={classes.card}
      onClick={navigateHandler}
    >
      <Flex className={classes.inner}>
        <Box className={classes.avatarBox}>
          <Image fallbackSrc={DEFAULT_AVATAR} src={`${API_SERVER}/${avatar}`} />
          <Badge
            className={classes.badge}
            color={searchStatus ? 'green' : 'gray'}
          >
            {searchStatus ? t('active_search') : t('passive_search')}
          </Badge>
        </Box>

        <Stack gap={rem(2)} className={classes.content}>
          <Title order={4} c='primary'>
            {position}, {salaryExpectations}$
          </Title>

          <Text fz='lg'>
            {firstName} {lastName}
          </Text>

          <Flex wrap='wrap' className={classes.row}>
            <Flex gap={rem(6)} align='center'>
              <IconCrown stroke='secondary' size={18} />
              <Text c='secondary'>
                {workExperience} {t('years')}
              </Text>
            </Flex>

            <Flex gap={rem(6)} align='center'>
              <IconChartBar stroke='secondary' size={18} />
              <Text c='secondary'>{experienceLevel}</Text>
            </Flex>

            <Flex gap={rem(6)} align='center'>
              <IconLanguage stroke='secondary' size={18} />
              <Text c='secondary'>{englishLevel}</Text>
            </Flex>
          </Flex>

          <Flex gap={rem(6)} align='center'>
            <IconMapPin stroke='secondary' size={18} />
            <Text c='secondary'>
              {country}, {city}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Card>
  );
}
