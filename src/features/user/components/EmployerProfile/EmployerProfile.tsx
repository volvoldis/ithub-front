import { useState } from 'react';
import {
  Box,
  Card,
  Group,
  TextInput,
  Stack,
  Badge,
  Button,
  Flex,
  Image,
  Center,
  FileButton,
  rem,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import {
  IconUser,
  IconMailFilled,
  IconPhone,
  IconWorldWww,
  IconBuilding,
} from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { API_SERVER, DEFAULT_AVATAR } from 'shared/constants';
import { formatDT } from 'shared/utils';
import { selectUser, selectUserIsLoading } from '../../userSlice';
import { userEditEmployer } from '../../service';

import type { IEmployerProfileFormValues } from './types';
import { employerProfileSchema } from './schema';
import type { IEmployerAccount } from '../../../types';
import classes from './EmployerProfile.module.scss';

export default function EmployerProfile() {
  const [preview, setPreview] = useState('');

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const employer = useAppSelector(selectUser) as IEmployerAccount;
  const loading = useAppSelector(selectUserIsLoading);

  const { getInputProps, onSubmit, setFieldValue } =
    useForm<IEmployerProfileFormValues>({
      initialValues: {
        firstName: employer?.firstName || '',
        lastName: employer?.lastName || '',
        avatar: employer?.avatar || '',
        email: employer?.email || '',
        phone: employer?.phone || '',
        linkedin: employer?.linkedin || '',
        userPosition: employer?.userPosition || '',
        image: undefined,
      },
      validate: zodResolver(employerProfileSchema),
    });

  const submitHandler = async (values: IEmployerProfileFormValues) => {
    try {
      await dispatch(
        userEditEmployer({ id: employer?._id, ...values }),
      ).unwrap();

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
        {employer?.updatedAt && (
          <Badge color='primary' className={classes.badge}>
            {t('updated')}: {formatDT(employer.updatedAt, true)}
          </Badge>
        )}
      </Group>

      <Card shadow='sm' radius={0} className={classes.card}>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
          <Flex gap={rem(24)} className={classes.form}>
            <Stack gap={rem(12)}>
              <Center className={classes.imgWrap}>
                <Image
                  fallbackSrc={DEFAULT_AVATAR}
                  src={preview || `${API_SERVER}/${employer?.avatar}`}
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
                label={t('you_position_in_company')}
                placeholder='HR'
                leftSection={<IconBuilding size={16} />}
                {...getInputProps('userPosition')}
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
