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
  Breadcrumbs,
  Divider,
  rem,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'shared/routes';
import { API_SERVER, DEFAULT_AVATAR } from 'shared/constants';
import {
  IconMail,
  IconBrandLinkedin,
  IconPhone,
  IconMapPin,
  IconCircleCheck,
  IconLanguage,
  IconChartDonut4,
  IconBrandSkype,
  IconBrandTelegram,
  IconBrandGithub,
  IconUserCode,
  IconSquareCheck,
  IconChartBar,
} from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import { useAppSelector } from 'store/hooks';
import { ChatButton } from 'features/chats';
import { selectResume } from '../../resumeSlice';
import { ISeekerAccount } from '../../../types';
import classes from './ResumeDetails.module.scss';

export default function ResumeDetails() {
  const resume = useAppSelector(selectResume);

  const {
    category,
    city,
    country,
    englishLevel,
    position,
    relocation,
    salaryExpectations,
    skills,
    summary,
    updatedAt,
    workExperience,
    owner,
    dontConsider,
    employment,
    experienceLevel,
  } = resume;

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    avatar,
    email,
    firstName,
    github,
    lastName,
    linkedin,
    phone,
    portfolio,
    searchStatus,
    skype,
    telegram,
  } = owner as ISeekerAccount;

  const { t } = useTranslation();

  const items = [
    { title: t('candidates'), href: ROUTES.resumes },
    { title: `${firstName} ${lastName}`, href: '#' },
  ].map((item) => (
    <Anchor component={Link} to={item.href} key={item.title}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack>
      <Breadcrumbs>{items}</Breadcrumbs>

      <Grid>
        {/* Seeker */}
        <Grid.Col order={{ md: 2 }} span={{ md: 4, xl: 3 }}>
          <Card shadow='sm' radius={0} className={classes.card}>
            <Card.Section className={classes.avatarBox}>
              {avatar && (
                <Image
                  fallbackSrc={DEFAULT_AVATAR}
                  src={`${API_SERVER}/${avatar}`}
                  w='100%'
                  h={250}
                />
              )}

              <Badge
                className={classes.badge}
                color={searchStatus ? 'green' : 'gray'}
              >
                {searchStatus ? t('active_search') : t('passive_search')}
              </Badge>
            </Card.Section>

            <Stack gap={rem(12)} pt={rem(12)}>
              <Title order={4}>
                {firstName} {lastName}
              </Title>

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

                {telegram && (
                  <Flex gap={rem(6)}>
                    <IconBrandTelegram stroke='secondary' />
                    <Anchor href={telegram}>Telegram</Anchor>
                  </Flex>
                )}

                {skype && (
                  <Flex gap={rem(6)}>
                    <IconBrandSkype stroke='secondary' />
                    <Text c='secondary'>{skype}</Text>
                  </Flex>
                )}
              </Group>

              <Divider />

              <Group gap={rem(8)}>
                {github && (
                  <Flex gap={rem(6)}>
                    <IconBrandGithub stroke='secondary' />
                    <Anchor href={github}>{github}</Anchor>
                  </Flex>
                )}

                {portfolio && (
                  <Flex gap={rem(6)}>
                    <IconUserCode stroke='secondary' />
                    <Anchor href={portfolio}>{portfolio}</Anchor>
                  </Flex>
                )}
              </Group>

              <ChatButton recipientId={_id} />
            </Stack>
          </Card>
        </Grid.Col>

        {/* Resume */}
        <Grid.Col span={{ md: 8, xl: 9 }}>
          <Card shadow='sm' radius={0} className={classes.card}>
            <Stack gap={rem(8)}>
              <Flex justify='space-between' wrap='wrap'>
                <Title order={3}>
                  {position}, {salaryExpectations}$
                </Title>
                {updatedAt && (
                  <Badge color='primary'>{formatDT(updatedAt)}</Badge>
                )}
              </Flex>

              <Flex gap={rem(6)} align='center'>
                <IconMapPin size={20} />
                <Text>
                  {country}, {city}
                </Text>
              </Flex>

              <Flex align='center' gap={rem(12)} wrap='wrap'>
                <Flex gap={rem(6)} align='center'>
                  <IconChartBar size={20} />
                  <Text>
                    {t('level')}: {experienceLevel}
                  </Text>
                </Flex>

                <Flex gap={rem(6)} align='center'>
                  <IconCircleCheck size={20} />
                  <Text>
                    {t('experience')}: {workExperience} {t('years')}
                  </Text>
                </Flex>

                <Flex gap={rem(6)} align='center'>
                  <IconLanguage size={20} />
                  <Text>English: {englishLevel}</Text>
                </Flex>
              </Flex>

              <Flex align='center' gap={rem(12)} wrap='wrap'>
                <Flex gap={rem(6)} align='center'>
                  <IconChartDonut4 size={20} />
                  <Text>{category}</Text>
                </Flex>

                {relocation && (
                  <Flex gap={rem(8)} align='center'>
                    <IconSquareCheck size={20} />
                    <Text>{t('ready_to_relocate')}</Text>
                  </Flex>
                )}
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

              <Flex gap={rem(6)} wrap='wrap'>
                <Text>{t('i_do_not_consider')}:</Text>
                <Flex align='center' gap={rem(8)} wrap='wrap'>
                  {dontConsider.map((e) => (
                    <Badge key={e} color='dark' tt='none'>
                      {e}
                    </Badge>
                  ))}
                </Flex>
              </Flex>

              <Flex gap={rem(2)} direction='column'>
                <Text>{t('my_skills')}:</Text>
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
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
