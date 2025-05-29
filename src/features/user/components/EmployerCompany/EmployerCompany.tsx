import { useState } from 'react';
import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Flex,
  Image,
  NumberInput,
  Textarea,
  Center,
  FileButton,
  rem,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import {
  IconWorldWww,
  IconBuilding,
  IconUsersGroup,
  IconMapPinFilled,
} from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { API_SERVER, DEFAULT_AVATAR } from 'shared/constants';
import { selectUser, selectUserIsLoading } from '../../userSlice';
import { userEditCompany } from '../../service';

import type { IEmployerCompanyFormValues } from './types';
import { employerCompanySchema } from './schema';
import type { IEmployerAccount } from '../../../types';
import classes from './EmployerCompany.module.scss';

export default function EmployerCompany() {
  const [preview, setPreview] = useState('');

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const employer = useAppSelector(selectUser) as IEmployerAccount;
  const isLoading = useAppSelector(selectUserIsLoading);

  const { getInputProps, onSubmit, setFieldValue } =
    useForm<IEmployerCompanyFormValues>({
      initialValues: {
        companyName: employer?.companyName || '',
        companyWebSite: employer?.companyWebSite || '',
        companyDouPage: employer?.companyDouPage || '',
        companyLogo: employer?.companyLogo || '',
        companyEmployeesCount: employer?.companyEmployeesCount || 0,
        companyDescription: employer?.companyDescription || '',
        companyOffices: employer?.companyOffices || '',
        image: undefined,
      },
      validate: zodResolver(employerCompanySchema),
    });

  const submitHandler = async (values: IEmployerCompanyFormValues) => {
    try {
      await dispatch(
        userEditCompany({ id: employer?._id, ...values }),
      ).unwrap();

      notifications.show({
        color: 'green',
        title: t('update_company'),
        message: t('company_data_has_updated_successful'),
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: t('update_company'),
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
    <Card shadow='sm' radius={0} className={classes.card}>
      <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
        <Flex gap={rem(24)} className={classes.form}>
          <Stack gap={rem(12)}>
            <Center className={classes.imgWrap}>
              <Image
                fallbackSrc={DEFAULT_AVATAR}
                src={preview || `${API_SERVER}/${employer?.companyLogo}`}
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
              label={t('company_name')}
              leftSection={<IconBuilding size={16} />}
              {...getInputProps('companyName')}
            />
            <TextInput
              label={t('company_page')}
              leftSection={<IconWorldWww size={16} />}
              placeholder='https://'
              {...getInputProps('companyWebSite')}
            />
            <NumberInput
              label={t('employees_count')}
              hideControls
              allowDecimal={false}
              leftSection={<IconUsersGroup size={16} />}
              {...getInputProps('companyEmployeesCount')}
            />
            <TextInput
              label={t('offices')}
              leftSection={<IconMapPinFilled size={16} />}
              placeholder='Ukraine (Kiyv, Dnipro)'
              {...getInputProps('companyOffices')}
            />
            <TextInput
              label={t('company_dou_page')}
              leftSection={<IconWorldWww size={16} />}
              placeholder='https://jobs.dou.ua/companies/'
              {...getInputProps('companyDouPage')}
            />
            <Textarea
              label={t('company_description')}
              autosize
              minRows={5}
              {...getInputProps('companyDescription')}
            />
            <Button type='submit' disabled={isLoading}>
              {t('update_company')}
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Card>
  );
}
