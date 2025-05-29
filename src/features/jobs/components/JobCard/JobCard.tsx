import {
  Card,
  Text,
  Badge,
  Image,
  Stack,
  Flex,
  Title,
  rem,
  Box,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { formatDT } from 'shared/utils';
import { IconMapPin, IconBuildingFortress } from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';
import { useNavigate } from 'react-router-dom';
import { API_SERVER, DEFAULT_COMPANY_AVATAR } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { ICompany, IJob } from '../../../types';
import classes from './JobCard.module.scss';

type JobCardProps = {
  job: IJob;
};

export default function JobCard({ job }: JobCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    author,
    city,
    country,
    updatedAt,
    salaryRange,
    title,
    isArchive,
    domain,
    applications,
    viewsCount,
  } = job;

  const { companyLogo, companyName } = author as ICompany;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const navigateHandler = () => {
    navigate(`${ROUTES.jobs}/${_id}`);
  };

  const iAlreadyApplied = applications.find((id) => id === user?._id);

  return (
    <Card
      shadow='sm'
      radius={0}
      className={classes.card}
      onClick={navigateHandler}
    >
      <Flex justify='space-between'>
        <Stack gap={rem(2)} className={classes.content}>
          <Title order={4} c='primary'>
            {title}, {salaryRange}$
          </Title>

          <Flex gap={rem(6)} wrap='wrap'>
            <Text fz='lg' truncate='end'>
              {companyName}
            </Text>

            <Flex gap={rem(4)} align='center'>
              <IconMapPin stroke='secondary' size={18} />
              <Text c='secondary' truncate='end'>
                {country}, {city}
              </Text>
            </Flex>
          </Flex>

          <Flex gap={rem(6)}>
            <Flex gap={rem(4)} align='center'>
              <IconBuildingFortress stroke='secondary' size={18} />
              <Text c='secondary'>{domain}</Text>
            </Flex>
          </Flex>

          <Flex gap={rem(6)} align='center'>
            <Text c='secondary'>
              {t('views')}:{' '}
              <Text span fw='bold'>
                {viewsCount}
              </Text>
            </Text>
            <Text c='secondary'>
              {t('applications')}:{' '}
              <Text span fw='bold'>
                {applications.length}
              </Text>
            </Text>
          </Flex>

          <Flex gap={rem(6)} align='center'>
            {iAlreadyApplied && (
              <Badge color='green' className={classes.badge}>
                {t('you_are_applied')}
              </Badge>
            )}
            {isArchive && (
              <Badge color='red' className={classes.badge}>
                {t('archived')}
              </Badge>
            )}
          </Flex>
        </Stack>

        <Box className={classes.avatarBox}>
          <Badge className={classes.timeBadge} color='primary'>
            {formatDT(updatedAt)}
          </Badge>
          <Image
            fallbackSrc={DEFAULT_COMPANY_AVATAR}
            src={`${API_SERVER}/${companyLogo}`}
          />
        </Box>
      </Flex>
    </Card>
  );
}
