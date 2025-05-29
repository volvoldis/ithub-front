import { useEffect } from 'react';
import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Select,
  Text,
  Slider,
  Radio,
  Flex,
  MultiSelect,
  Checkbox,
  Group,
  rem,
} from '@mantine/core';
import { t } from 'i18next';
import { IconMapPin } from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import {
  CATEGORIES,
  EXPERIENCE_YEARS,
  ENGLISH_LEVELS,
  EXPERIENCE_LEVELS,
  COMPANY_TYPES,
  EMPLOYMENT,
  DEV_DOMAINS,
  COUNTRIES,
  SKILLS,
} from 'shared/constants';
import { Editor } from 'components';
import {
  selectVacancyIsLoading,
  selectVacancy,
  resetVacancy,
} from '../../employerVacanciesSlice';

import { createVacancy, updateVacancy } from '../../services';
import { vacancySchema } from './schema';
import classes from './Vacancy.module.scss';

import type { VacancyFormValues } from './types';

const INITIAL_VALUES = {
  title: '',
  category: '',
  domain: '',
  skills: [],
  workExperience: 0,
  experienceLevel: '',
  salaryRange: '',
  country: '',
  city: '',
  englishLevel: '',
  summary: '',
  companyType: '',
  employment: [],
  isArchive: false,
};

export default function Vacancy() {
  const dispatch = useAppDispatch();

  const vacancy = useAppSelector(selectVacancy);
  const isLoading = useAppSelector(selectVacancyIsLoading);

  const { onSubmit, getInputProps, setValues, values, setFieldValue } =
    useForm<VacancyFormValues>({
      initialValues: vacancy._id
        ? {
            title: vacancy.title,
            category: vacancy.category,
            domain: vacancy.domain,
            skills: vacancy.skills,
            workExperience: vacancy.workExperience,
            experienceLevel: vacancy.experienceLevel,
            salaryRange: vacancy.salaryRange,
            country: vacancy.country,
            city: vacancy.city,
            englishLevel: vacancy.englishLevel,
            summary: vacancy.summary,
            companyType: vacancy.companyType,
            employment: vacancy.employment,
            isArchive: vacancy.isArchive,
          }
        : INITIAL_VALUES,
      validate: zodResolver(vacancySchema),
    });

  const submitHandler = async (data: VacancyFormValues) => {
    if (vacancy._id) {
      const updateData = { _id: vacancy._id, ...data };
      try {
        await dispatch(updateVacancy(updateData)).unwrap();
        setValues(INITIAL_VALUES);
        notifications.show({
          color: 'green',
          title: t('vacancy'),
          message: t('vacancy_updated'),
        });
      } catch (error: unknown) {
        notifications.show({
          color: 'red',
          title: t('vacancy'),
          message: error as string,
        });
      }
    } else {
      try {
        await dispatch(createVacancy(values)).unwrap();
        setValues(INITIAL_VALUES);
        notifications.show({
          color: 'green',
          title: t('vacancy'),
          message: t('vacancy_created'),
        });
      } catch (error: unknown) {
        notifications.show({
          color: 'red',
          title: t('vacancy'),
          message: error as string,
        });
      }
    }
  };

  const onSummaryUpdate = (v: string) => {
    setFieldValue('summary', v);
  };

  useEffect(() => {
    return () => {
      dispatch(resetVacancy());
    };
  }, [dispatch]);

  return (
    <Card className={classes.card}>
      <Box component='form' onSubmit={onSubmit(submitHandler)}>
        <Stack gap={rem(16)}>
          <TextInput
            label={t('job_position')}
            placeholder={t('developer')}
            {...getInputProps('title')}
          />

          <Select
            label={t('domain')}
            placeholder='Web'
            value={values.domain}
            data={DEV_DOMAINS}
            onChange={(value) => setFieldValue('domain', value!)}
          />

          <Select
            label={t('category')}
            placeholder='Frontend'
            value={values.category}
            data={CATEGORIES}
            onChange={(value) => setFieldValue('category', value!)}
          />

          <Radio.Group
            value={values.companyType}
            label={t('company_type')}
            onChange={(value) => setFieldValue('companyType', value)}
          >
            <Flex gap={rem(12)} pt={rem(8)} pl={rem(20)} wrap='wrap'>
              {COMPANY_TYPES.map((ct) => (
                <Radio key={ct} value={ct} label={ct} />
              ))}
            </Flex>
          </Radio.Group>

          <Stack gap={rem(4)} pb={12}>
            <Text size='sm' fw='bold' pb={8}>
              {t('experience')} ({t('years')})
            </Text>
            <Slider
              defaultValue={0}
              min={0}
              max={10}
              label={(value) => `${value} ${t('years')}`}
              step={0.5}
              value={values.workExperience}
              marks={EXPERIENCE_YEARS}
              onChangeEnd={(value) => setFieldValue('workExperience', value)}
            />
          </Stack>

          <TextInput
            label={`${t('salary_range')}, $`}
            placeholder='1000 - 2000 $'
            {...getInputProps('salaryRange')}
          />

          <MultiSelect
            label={t('required_skills')}
            placeholder='js'
            value={values.skills}
            data={SKILLS}
            searchable
            clearable
            hidePickedOptions
            onChange={(value) => setFieldValue('skills', value)}
          />

          <Select
            label={t('country')}
            placeholder='USA'
            value={values.country}
            data={COUNTRIES}
            searchable
            clearable
            onChange={(value) => setFieldValue('country', value!)}
          />

          <TextInput
            label={t('city_town')}
            placeholder='New York'
            leftSection={<IconMapPin size={16} />}
            {...getInputProps('city')}
          />

          <Radio.Group
            value={values.experienceLevel}
            label={t('level')}
            onChange={(value) => setFieldValue('experienceLevel', value)}
          >
            <Stack gap={12} pt={8} pl={20}>
              {EXPERIENCE_LEVELS.map((lv) => (
                <Radio key={lv} value={lv} label={lv} />
              ))}
            </Stack>
          </Radio.Group>

          <Stack gap={4}>
            <Text size='sm' fw='bold' pb={8}>
              {t('more_details')}
            </Text>
            <Editor
              content={values.summary}
              placeholder='...'
              onChange={onSummaryUpdate}
            />
          </Stack>

          <Radio.Group
            name='englishLevel'
            value={values.englishLevel}
            label='English'
            defaultValue={ENGLISH_LEVELS[0]}
            onChange={(value) => setFieldValue('englishLevel', value)}
          >
            <Stack gap={12} pt={8} pl={20}>
              {ENGLISH_LEVELS.map((lvl) => (
                <Radio key={lvl} value={lvl} label={lvl} />
              ))}
            </Stack>
          </Radio.Group>

          <Checkbox.Group
            label={t('employment')}
            value={values.employment}
            onChange={(value) => setFieldValue('employment', value)}
          >
            <Group mt='xs'>
              {EMPLOYMENT.map((e) => (
                <Checkbox key={e} label={e} value={e} />
              ))}
            </Group>
          </Checkbox.Group>

          {vacancy._id && (
            <Checkbox
              label={t('to_archive')}
              {...getInputProps('isArchive', { type: 'checkbox' })}
            />
          )}

          <Button type='submit' disabled={isLoading}>
            {vacancy._id ? t('update_vacancy') : t('add_vacancy')}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
