import {
  Title,
  Card,
  Text,
  Group,
  Badge,
  Grid,
  Stack,
  Flex,
  Anchor,
  Image,
  Button,
  Breadcrumbs,
  Divider,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useTranslation } from 'react-i18next';
import { socket } from 'socket';
import {
  IconBuilding,
  IconBrandLinkedin,
  IconCircleCheck,
  IconPhone,
  IconMapPin,
  IconChartBar,
  IconLanguage,
  IconChartInfographic,
  IconChartCandle,
  IconChartDonut4,
  IconMail,
  IconPlus,
} from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import {
  ROLES,
  API_SERVER,
  DEFAULT_COMPANY_AVATAR,
  DEFAULT_AVATAR,
} from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';
import { ChatButton } from 'features/chats';
import { selectJob } from '../../jobsSlice';

import { applyToJob } from '../../services';
import { ICompany, ISeekerAccount } from '../../../types';
import classes from './JobDetails.module.scss';

export default function JobDetailes() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const job = useAppSelector(selectJob);
  const user = useAppSelector(selectUser);

  const {
    _id: jobId,
    author,
    category,
    city,
    companyType,
    country,
    domain,
    employment,
    englishLevel,
    experienceLevel,
    salaryRange,
    skills,
    summary,
    title,
    updatedAt,
    workExperience,
    viewsCount,
    applications,
    isArchive,
  } = job;

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    avatar,
    companyLogo,
    companyName,
    email,
    phone,
    userPosition,
    linkedin,
    firstName,
    lastName,
    companyOffices,
  } = author as ICompany;

  const applyJobHandler = async () => {
    if (user?._id) {
      try {
        await dispatch(applyToJob(job._id)).unwrap();

        socket.emit('applyToJob', {
          senderId: user._id,
          receiverId: _id,
          senderName: `${user.firstName} ${user.lastName}`,
          jobTitle: title,
        });

        notifications.show({
          color: 'green',
          title: t('apply_to_job'),
          message: t('you_succeffull_applied_to_this_position'),
        });
      } catch (error: unknown) {
        notifications.show({
          color: 'red',
          title: t('apply_to_job'),
          message: error as string,
        });
      }
    }
  };

  const iAlreadyApplied = applications.find((id) => id === user?._id);
  const showApplyBtn = !iAlreadyApplied && user?.role === ROLES.seeker;

  const items = [
    { title: t('jobs'), href: ROUTES.jobs },
    { title, href: '#' },
  ].map((item) => (
    <Anchor to={item.href} component={Link} key={item.title}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack>
      <Breadcrumbs>{items}</Breadcrumbs>

      <Grid>
        {/* Employer, Company Card */}
        <Grid.Col order={{ md: 2 }} span={{ md: 4, lg: 3 }}>
          <Card shadow='sm' radius={0} className={classes.card}>
            <Card.Section className={classes.avatarBox}>
              {avatar && (
                <Image
                  fallbackSrc={DEFAULT_AVATAR}
                  src={`${API_SERVER}/${avatar}`}
                  w='100%'
                  h={250}
                  radius='md'
                />
              )}

              <Badge className={classes.badgeAvatar} color='gray'>
                {userPosition}
              </Badge>
            </Card.Section>

            <Stack gap={rem(12)} pt={rem(12)}>
              <Title order={4}>
                {firstName} {lastName}
              </Title>

              <Group gap={rem(8)}>
                <Flex gap={rem(6)}>
                  <IconBuilding stroke='secondary' />
                  <Anchor component={Link} to={`${ROUTES.companies}/${_id}`}>
                    {companyName}
                  </Anchor>
                </Flex>

                <Flex align='center' gap={rem(4)}>
                  <IconMapPin stroke='secondary' />
                  <Text>{companyOffices}</Text>
                </Flex>
              </Group>

              <Divider />

              <Group gap={rem(8)}>
                <Flex gap={rem(6)}>
                  <IconMail stroke='secondary' />
                  <Anchor href={`mailto:${email}`}>E-Mail</Anchor>
                </Flex>

                {phone && (
                  <Flex gap={rem(6)}>
                    <IconPhone stroke='secondary' />
                    <Anchor href={`tel:${phone}`}>{t('call')}</Anchor>
                  </Flex>
                )}

                {linkedin && (
                  <Flex gap={rem(6)}>
                    <IconBrandLinkedin stroke='secondary' />
                    <Anchor href={linkedin}>LinkedIn</Anchor>
                  </Flex>
                )}
              </Group>

              <ChatButton recipientId={_id} />
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ md: 8, lg: 9 }}>
          {/* Job */}
          <Card shadow='sm' radius={0} className={classes.card}>
            <Flex
              gap={rem(24)}
              justify='space-between'
              align='flex-start'
              className={classes.inner}
            >
              <Stack gap={rem(8)} w='100%'>
                <Flex justify='space-between' wrap='wrap'>
                  <Title order={2}>
                    {title}, {salaryRange}$
                  </Title>

                  <Flex justify='space-between' gap={rem(12)}>
                    <Group>
                      <Text>
                        {t('views')}: {viewsCount}
                      </Text>
                      <Text>
                        {t('applications')}: {applications.length}
                      </Text>
                    </Group>
                  </Flex>
                </Flex>

                <Flex gap={rem(8)}>
                  {updatedAt && (
                    <Badge color='primary' className={classes.badge}>
                      {formatDT(updatedAt)}
                    </Badge>
                  )}

                  {isArchive && (
                    <Badge color='red' className={classes.badge}>
                      {t('archived')}
                    </Badge>
                  )}

                  {iAlreadyApplied && (
                    <Badge color='green' className={classes.badge}>
                      {t('you_are_applied')}
                    </Badge>
                  )}
                </Flex>

                <Flex gap={rem(8)} align='center'>
                  <IconMapPin size={20} />
                  <Text>
                    {country}, {city}
                  </Text>
                </Flex>

                <Flex align='center' gap={rem(8)} wrap='wrap'>
                  <Flex gap={rem(6)} align='center'>
                    <IconChartInfographic size={20} />
                    <Text>{companyType}</Text>
                  </Flex>

                  <Flex gap={rem(6)} align='center'>
                    <IconChartCandle size={20} />
                    <Text>{domain}</Text>
                  </Flex>

                  <Flex gap={rem(6)} align='center'>
                    <IconChartDonut4 size={20} />
                    <Text>{category}</Text>
                  </Flex>
                </Flex>

                <Flex gap={rem(8)} wrap='wrap'>
                  <Text>{t('employment')}:</Text>
                  <Flex align='center' gap={12} wrap='wrap'>
                    {employment.map((e) => (
                      <Badge key={e} color='blue' tt='none'>
                        {e}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>

                <Flex gap={rem(8)} wrap='wrap'>
                  <Flex gap={rem(6)} align='center'>
                    <IconCircleCheck size={20} />
                    <Text>
                      {t('experience')}: {workExperience} {t('years')}
                    </Text>
                  </Flex>

                  <Flex gap={rem(6)} align='center'>
                    <IconChartBar size={20} />
                    <Text>
                      {t('level')}: {experienceLevel}
                    </Text>
                  </Flex>

                  <Flex gap={rem(6)} align='center'>
                    <IconLanguage size={20} />
                    <Text>English: {englishLevel}</Text>
                  </Flex>
                </Flex>

                <Flex gap={rem(2)} direction='column'>
                  <Text>{t('required_skills')}:</Text>
                  <Flex align='center' gap={rem(8)} wrap='wrap'>
                    {skills.map((skill) => (
                      <Badge key={skill} color='primary' tt='none'>
                        {skill}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>

                <Divider my={rem(8)} />

                <Stack gap={rem(8)}>
                  <Text>{t('description')}:</Text>
                  <div dangerouslySetInnerHTML={{ __html: summary }} />
                </Stack>
              </Stack>

              <Stack>
                {companyLogo && (
                  <Image
                    fallbackSrc={DEFAULT_COMPANY_AVATAR}
                    src={`${API_SERVER}/${companyLogo}`}
                    w={rem(160)}
                    radius='sm'
                    className={classes.companyName}
                  />
                )}

                {showApplyBtn && (
                  <Button
                    onClick={applyJobHandler}
                    variant='outline'
                    leftSection={<IconPlus />}
                  >
                    {t('apply')}
                  </Button>
                )}
              </Stack>
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
