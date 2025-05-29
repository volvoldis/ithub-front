import {
  Card,
  Stack,
  Flex,
  Text,
  Anchor,
  ActionIcon,
  rem,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import {
  IconEdit,
  IconTrash,
  IconArrowBack,
  IconFileSmile,
} from '@tabler/icons-react';
import { formatDT, formatBytes, getDocType } from 'shared/utils';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { API_SERVER } from 'shared/constants';
import { deleteDoc } from '../../services';
import {
  setCurrentDoc,
  selectDocument,
  resetCurrentDoc,
} from '../../docsSlice';
import { IDoc } from '../../../types';
import classes from './DocItem.module.scss';

type DocItemProps = {
  document: IDoc;
  showControls?: boolean;
};

export default function DocItem({
  document,
  showControls = false,
}: DocItemProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, size, title, type, updatedAt, url, filename } = document;

  const currentDoc = useAppSelector(selectDocument);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const link = url.startsWith('uploads') ? `${API_SERVER}/${url}` : url;
  const isCurrentDoc = _id === currentDoc._id;

  const deleteDocHandler = async () => {
    try {
      await dispatch(deleteDoc(_id)).unwrap();
      if (isCurrentDoc) {
        dispatch(resetCurrentDoc());
      }
      notifications.show({
        color: 'green',
        title: t('document'),
        message: t('document_was_successful_deleted'),
      });
    } catch (error) {
      notifications.show({
        color: 'red',
        title: t('document'),
        message: error as string,
      });
    }
  };

  const editDocHandler = () => {
    dispatch(setCurrentDoc(_id));
  };

  const resetEditDoc = () => {
    dispatch(resetCurrentDoc());
  };

  return (
    <Card
      shadow='sm'
      radius={0}
      className={`${classes.card} ${isCurrentDoc ? classes.activeCard : ''}`}
    >
      <Flex gap={rem(12)}>
        <IconFileSmile size={40} className={classes.icon} stroke={1} />

        <Stack gap={rem(2)} className={classes.content}>
          <Anchor
            href={link}
            target='_blank'
            size='md'
            className={classes.title}
          >
            {title} {filename}
          </Anchor>

          <Flex className={classes.info}>
            <Text size='sm'>
              <Text span>{t('updated')}: </Text>
              <Text span c='secondary'>
                {formatDT(updatedAt, true)}
              </Text>
            </Text>

            {type && (
              <Text size='sm'>
                <Text span>{t('type')}: </Text>
                <Text span c='secondary'>
                  {getDocType(type)}
                </Text>
              </Text>
            )}

            {size && (
              <Text size='sm'>
                <Text span>{t('size')}: </Text>
                <Text span c='secondary'>
                  {formatBytes(Number(size))}
                </Text>
              </Text>
            )}
          </Flex>
        </Stack>
        {showControls && (
          <Flex direction='column'>
            {!isCurrentDoc && (
              <ActionIcon variant='subtle' size='md' onClick={editDocHandler}>
                <IconEdit style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            )}

            {isCurrentDoc && (
              <ActionIcon variant='subtle' size='md' onClick={resetEditDoc}>
                <IconArrowBack style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            )}
            <ActionIcon variant='subtle' size='md' onClick={deleteDocHandler}>
              <IconTrash style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
