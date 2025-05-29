import { useEffect } from 'react';
import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Checkbox,
  NumberInput,
  Group,
  Badge,
  Radio,
  Slider,
  Text,
  Select,
  MultiSelect,
  rem,
  Loader,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconMapPin } from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Editor } from 'components';
import { notifications } from '@mantine/notifications';
import { formatDT } from 'shared/utils';
import {
  ENGLISH_LEVELS,
  CATEGORIES,
  EXPERIENCE_YEARS,
  EXPERIENCE_LEVELS,
  COUNTRIES,
  SKILLS,
  NOT_CONSIDER_DOMAINS,
  EMPLOYMENT,
} from 'shared/constants';
import {
  selectMyResumeUpdateIsLoading,
  selectMyResume,
  selectMyResumeIsLoading,
} from '../../resumeSlice';
import { editResume, getMyResume } from '../../services';

import type { IResumeFormValues } from './types';
import { resumeSchema } from './schema';
import classes from './Resume.module.scss';

function Resume() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    position,
    category,
    skills,
    workExperience,
    experienceLevel,
    salaryExpectations,
    country,
    city,
    relocation,
    englishLevel,
    summary,
    employment,
    dontConsider,
    createdAt,
    updatedAt,
    isPublished,
  } = useAppSelector(selectMyResume);
  const isLoading = useAppSelector(selectMyResumeUpdateIsLoading);

  const { getInputProps, onSubmit, values, setFieldValue } =
    useForm<IResumeFormValues>({
      initialValues: {
        position,
        category,
        skills,
        workExperience,
        experienceLevel,
        salaryExpectations,
        country,
        city,
        relocation,
        englishLevel,
        summary,
        employment,
        dontConsider,
        isPublished,
      },
      validate: zodResolver(resumeSchema),
    });

  const submitHandler = async (data: IResumeFormValues) => {
    try {
      await dispatch(editResume({ id: _id, ...data })).unwrap();
      notifications.show({
        color: 'green',
        title: t('resume'),
        message: t('the_resume_was_successfully_updated'),
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: t('resume'),
        message: error as string,
      });
    }
  };

  const isResume = createdAt !== updatedAt;

  const onSummaryUpdate = (v: string) => {
    setFieldValue('summary', v);
  };

  return (
    <Stack gap={rem(24)}>
      <Group justify='end' gap={rem(6)}>
        {isResume && (
          <Badge color='primary' className={classes.badge}>
            {t('updated')}: {formatDT(updatedAt, true)}
          </Badge>
        )}
        <Badge color={isPublished ? 'green' : 'gray'} className={classes.badge}>
          {isPublished ? t('published') : t('not_published')}
        </Badge>
      </Group>
      <Card shadow='sm' radius={0} className={classes.card}>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
          <Stack gap={rem(16)}>
            <TextInput
              label={t('search_position')}
              placeholder='React'
              {...getInputProps('position')}
            />

            <Select
              label={t('category')}
              placeholder='Frontend'
              value={values.category}
              data={CATEGORIES}
              onChange={(value) => setFieldValue('category', value!)}
            />

            <Stack gap={rem(4)} pb={12}>
              <Text size='sm' fw='bold' pb={8}>
                {t('experience')} ({t('years')})
              </Text>
              <Slider
                defaultValue={0}
                min={0}
                max={10}
                label={(value) => `${value} years`}
                step={0.5}
                value={values.workExperience}
                marks={EXPERIENCE_YEARS}
                onChangeEnd={(value) => setFieldValue('workExperience', value)}
              />
            </Stack>

            <NumberInput
              label={`${t('salary_expectations')}, $`}
              prefix='$ '
              hideControls
              allowDecimal={false}
              {...getInputProps('salaryExpectations')}
            />

            <MultiSelect
              label={t('my_skills')}
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
              placeholder='Select country'
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

            <Checkbox
              label={t('consider_relocation_to_another_city')}
              {...getInputProps('relocation', { type: 'checkbox' })}
            />

            <Radio.Group
              value={values.experienceLevel}
              label={t('level')}
              onChange={(value) => setFieldValue('experienceLevel', value)}
            >
              <Stack gap={rem(12)} pt={rem(8)} pl={rem(20)}>
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <Radio key={lvl} value={lvl} label={lvl} />
                ))}
              </Stack>
            </Radio.Group>

            <Stack gap={4}>
              <Text size='sm' fw='bold' pb={rem(8)}>
                {t('tell_about_yourself')}
              </Text>
              <Editor
                content={values.summary}
                placeholder='...'
                onChange={onSummaryUpdate}
              />
            </Stack>

            <Radio.Group
              label='English'
              value={values.englishLevel}
              onChange={(value) => setFieldValue('englishLevel', value)}
            >
              <Stack gap={rem(12)} pt={rem(8)} pl={rem(20)}>
                {ENGLISH_LEVELS.map((lv) => (
                  <Radio key={lv} value={lv} label={lv} />
                ))}
              </Stack>
            </Radio.Group>

            <Checkbox.Group
              label={t('employment')}
              value={values.employment}
              onChange={(value) => setFieldValue('employment', value)}
            >
              <Group gap={rem(8)}>
                {EMPLOYMENT.map((e) => (
                  <Checkbox key={e} label={e} value={e} />
                ))}
              </Group>
            </Checkbox.Group>

            <Checkbox.Group
              label={t('do_not_consider')}
              value={values.dontConsider}
              onChange={(value) => setFieldValue('dontConsider', value)}
            >
              <Group gap={rem(8)}>
                {NOT_CONSIDER_DOMAINS.map((d) => (
                  <Checkbox key={d} label={d} value={d} />
                ))}
              </Group>
            </Checkbox.Group>

            <Checkbox
              label={t('publish_my_resume')}
              mt={rem(8)}
              fw='bold'
              {...getInputProps('isPublished', { type: 'checkbox' })}
            />

            <Button type='submit' disabled={isLoading}>
              {isResume ? t('update_resume') : t('create_resume')}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
}

export default function ResumeEnhancer() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMyResumeIsLoading);

  useEffect(() => {
    dispatch(getMyResume());
  }, [dispatch]);

  return loading ? <Loader type='dots' m='16px auto' /> : <Resume />;
}
