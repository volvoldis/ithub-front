import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IconBrandHipchat } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import { selectIsAuthorized, selectUser } from '../../../user/userSlice';
import { selectCreateChatLoading } from '../../chatsSlice';
import { createChat } from '../../services';

type ChatButtonProps = {
  recipientId: string;
};

export default function ChatButton({ recipientId }: ChatButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuthorized);
  const currentUser = useAppSelector(selectUser);
  const loading = useAppSelector(selectCreateChatLoading);

  const chatHandler = async () => {
    try {
      const chatId = await dispatch(createChat(recipientId)).unwrap();
      navigate(`${ROUTES.chats}/${chatId}`);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  if (isAuth && currentUser?._id !== recipientId) {
    return (
      <Button
        leftSection={<IconBrandHipchat />}
        onClick={chatHandler}
        variant='filled'
        color='cyan.9'
        disabled={loading}
      >
        Chat
      </Button>
    );
  }

  return null;
}
