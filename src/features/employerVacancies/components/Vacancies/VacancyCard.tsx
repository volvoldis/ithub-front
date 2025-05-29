import {
  Title,
  Card,
  Text,
  Stack,
  Group,
  Badge,
  rem,
  Anchor,
  Flex,
  Button,
  Collapse,
  Divider,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconUserSearch, IconEye } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'shared/routes';
import { formatDT } from 'shared/utils';
import classes from './VacancyCard.module.scss';

import { IVacancy } from '../../../types';

type VacancyCardProps = {
  vacancy: IVacancy;
  onEdit: () => void;
};

export default function VacancyCard({ vacancy, onEdit }: VacancyCardProps) {
  const {
    category,
    city,
    country,
    companyType,
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
  } = vacancy;

  const [opened, { toggle }] = useDisclosure(false);

  const { t } = useTranslation();

  return (
    <Card shadow='sm' radius={0} className={classes.card}>
      <Stack gap={rem(8)}>
        <Group justify='space-between' gap={rem(2)}>
          <Title order={4}>
            {title}, {'  '} {salaryRange}$
          </Title>

          <Button
            variant='outline'
            size='xs'
            leftSection={
              <IconEdit style={{ width: rem(20), height: rem(20) }} />
            }
            onClick={onEdit}
          >
            {t('Edit')}
          </Button>
        </Group>

        <Group align='center' gap={rem(8)}>
          {updatedAt && (
            <Badge color='primary' tt='none'>
              {t('updated')}: {formatDT(updatedAt, true)}
            </Badge>
          )}

          {isArchive && (
            <Badge color='red' tt='none'>
              {t('archived')}
            </Badge>
          )}
        </Group>

        <Group align='center' gap={rem(8)}>
          <Flex align='center' gap={rem(4)}>
            <Text>{t('offices')}: </Text>
            <Badge tt='none'>
              {country}, {city}
            </Badge>
          </Flex>

          <Flex align='center' gap={rem(4)}>
            <Text>{t('domain')}: </Text>
            <Badge tt='none'>{domain}</Badge>
          </Flex>

          <Flex align='center' gap={rem(4)}>
            <Text>{t('category')}: </Text>
            <Badge tt='none'>{category}</Badge>
          </Flex>
        </Group>

        <Group align='center' gap={rem(8)}>
          <Flex align='center' gap={rem(4)}>
            <Text>{t('company_type')}: </Text>
            <Badge color='cyan' tt='none'>
              {companyType}
            </Badge>
          </Flex>

          <Flex align='center' gap={rem(4)} wrap='wrap'>
            <Text>{t('employment')}: </Text>
            {employment.map((e) => (
              <Badge key={e} color='cyan' tt='none'>
                {e}
              </Badge>
            ))}
          </Flex>
        </Group>

        <Group align='center' gap={rem(8)}>
          <Flex align='center' gap={rem(4)}>
            <Text>{t('level')}: </Text>
            <Badge tt='none' color='teal'>
              {experienceLevel}
            </Badge>
          </Flex>

          <Flex align='center' gap={rem(4)}>
            <Text>{t('experience')}: </Text>
            <Badge tt='none' color='teal'>
              {workExperience} {t('years')}
            </Badge>
          </Flex>

          <Flex align='center' gap={rem(4)}>
            <Text>English: </Text>
            <Badge tt='none' color='teal'>
              {englishLevel}
            </Badge>
          </Flex>
        </Group>

        <Group align='center' gap={rem(2)}>
          <Text>{t('required_skills')}: </Text>
          {skills.map((item) => (
            <Badge key={item} color='dark' tt='none'>
              {item}
            </Badge>
          ))}
        </Group>

        <Divider my={rem(6)} />

        <Flex gap={rem(4)} direction='column'>
          <Group>
            <Text>
              {t('views')}: {viewsCount}
            </Text>
            <Text>
              {t('applications')}: {applications.length}
            </Text>
          </Group>

          <Flex gap={rem(4)} wrap='wrap'>
            {applications.map(({ _id, firstName, lastName, resume }) => (
              <Flex key={_id} gap={rem(6)}>
                <IconUserSearch size={20} />
                <Anchor
                  component={Link}
                  target='_blank'
                  to={`${ROUTES.resumes}/${resume}`}
                  underline='never'
                >
                  {firstName} {lastName}
                </Anchor>
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Divider my={rem(6)} />

        <Stack gap={rem(8)}>
          <Button
            size='xs'
            variant='outline'
            w={rem(100)}
            leftSection={<IconEye size={20} />}
            onClick={toggle}
          >
            {opened ? t('less') : t('more')}
          </Button>
          <Collapse in={opened}>
            <div dangerouslySetInnerHTML={{ __html: summary }} />
          </Collapse>
        </Stack>
      </Stack>
    </Card>
  );
}
