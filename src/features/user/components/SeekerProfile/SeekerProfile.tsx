import { useState } from 'react';
import {
  Box,
  Card,
  TextInput,
  Image,
  Stack,
  Button,
  Checkbox,
  Flex,
  Badge,
  Group,
  FileButton,
  Center,
  rem,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  IconUser,
  IconMailFilled,
  IconPhone,
  IconWorldWww,
  IconBrandSkype,
  IconBrandTelegram,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { formatDT } from 'shared/utils';
import { API_SERVER, DEFAULT_AVATAR } from 'shared/constants';
import { selectUser, selectUserIsLoading } from '../../userSlice';
import { userEditSeeker } from '../../service';

import type { SeekerProfileFormValues } from './types';
import { seekerProfileSchema } from './schema';
import { ISeekerAccount } from '../../../types';
import classes from './SeekerProfile.module.scss';

export default function SeekerProfile() {
  const [preview, setPreview] = useState('');

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const seeker = useAppSelector(selectUser) as ISeekerAccount;
  const loading = useAppSelector(selectUserIsLoading);

  const { getInputProps, onSubmit, setFieldValue } =
    useForm<SeekerProfileFormValues>({
      initialValues: {
        searchStatus: seeker?.searchStatus,
        firstName: seeker?.firstName || '',
        lastName: seeker?.lastName || '',
        avatar: seeker?.avatar || '',
        email: seeker?.email || '',
        phone: seeker?.phone || '',
        linkedin: seeker?.linkedin || '',
        github: seeker?.github || '',
        portfolio: seeker?.portfolio || '',
        skype: seeker?.skype || '',
        telegram: seeker?.telegram || '',
        image: undefined,
      },
      validate: zodResolver(seekerProfileSchema),
    });

  const submitHandler = async (data: SeekerProfileFormValues) => {
    try {
      await dispatch(userEditSeeker({ id: seeker?._id, ...data })).unwrap();

      notifications.show({
        color: 'green',
        title: t('update_profile'),
        message: t('user_data_has_updated_successful'),
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: t('update_profile'),
        message: error as string,
      });
    }
  };

  const changeImageHandler = (file: File | null) => {
    if (file) {
      setFieldValue('image', file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <Stack gap={rem(24)}>
      <Group justify='end' gap={rem(6)}>
        {seeker?.updatedAt && (
          <Badge color='primary' className={classes.badge}>
            {t('updated')}: {formatDT(seeker.updatedAt, true)}
          </Badge>
        )}
        <Badge
          color={seeker?.searchStatus ? 'green' : 'gray'}
          className={classes.badge}
        >
          {seeker?.searchStatus ? t('active_search') : t('passive_search')}
        </Badge>
      </Group>
      <Card shadow='sm' radius={0} className={classes.card}>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
          <Flex gap={rem(24)} className={classes.form}>
            <Stack gap={rem(12)}>
              <Center className={classes.imgWrap}>
                <Image
                  fallbackSrc={DEFAULT_AVATAR}
                  src={preview || `${API_SERVER}/${seeker?.avatar}`}
                  w='100%'
                  h='100%'
                  radius='md'
                />
              </Center>

              <FileButton
                onChange={changeImageHandler}
                accept='image/png,image/jpeg'
              >
                {(props) => (
                  <Button {...props} variant='outline'>
                    {t('upload_avatar')}
                  </Button>
                )}
              </FileButton>
            </Stack>
            <Stack gap={rem(12)} w='100%'>
              <TextInput
                label={t('first_name')}
                leftSection={<IconUser size={16} />}
                {...getInputProps('firstName')}
              />
              <TextInput
                label={t('last_name')}
                leftSection={<IconUser size={16} />}
                {...getInputProps('lastName')}
              />
              <TextInput
                label='Email'
                leftSection={<IconMailFilled size={16} />}
                readOnly
                {...getInputProps('email')}
              />
              <TextInput
                label={t('phone')}
                leftSection={<IconPhone size={16} />}
                placeholder='+3780'
                {...getInputProps('phone')}
              />
              <TextInput
                label={`LinkedIn ${t('page')}`}
                leftSection={<IconWorldWww size={16} />}
                placeholder='https://www.linkedin.com/'
                {...getInputProps('linkedin')}
              />
              <TextInput
                label={`GitHub ${t('page')}`}
                leftSection={<IconWorldWww size={16} />}
                placeholder='https://github.com/'
                {...getInputProps('github')}
              />
              <TextInput
                label={t('portfolio_page')}
                leftSection={<IconWorldWww size={16} />}
                placeholder='https://'
                {...getInputProps('portfolio')}
              />
              <TextInput
                label='Skype'
                leftSection={<IconBrandSkype size={16} />}
                {...getInputProps('skype')}
              />
              <TextInput
                label='Telegram'
                leftSection={<IconBrandTelegram size={16} />}
                placeholder='https://t.me/'
                {...getInputProps('telegram')}
              />
              <Checkbox
                label={t('active_search')}
                {...getInputProps('searchStatus', { type: 'checkbox' })}
              />
              <Button type='submit' disabled={loading}>
                {t('update_profile')}
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Card>
    </Stack>
  );
}
