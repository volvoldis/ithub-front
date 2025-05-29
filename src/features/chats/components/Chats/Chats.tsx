import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Loader, Stack, Title } from '@mantine/core';

import {
  selectChats,
  selectChatsLoading,
  selectChatsError,
} from '../../chatsSlice';
import { getMyChats } from '../../services';
import { ChatItem } from '../ChatItem';

export default function Chats() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const loading = useAppSelector(selectChatsLoading);
  const error = useAppSelector(selectChatsError);
  const chats = useAppSelector(selectChats);

  useEffect(() => {
    dispatch(getMyChats());
  }, [dispatch]);

  return loading ? (
    <Loader type='dots' m='20px auto' />
  ) : error ? (
    <Title order={3}>{error}</Title>
  ) : chats.length > 0 ? (
    <Stack gap={4}>
      {chats.map((item) => (
        <ChatItem key={item._id} chat={item} />
      ))}
    </Stack>
  ) : (
    <Title order={3}>{t('not_found_chats')}</Title>
  );
}
