import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'shared/routes';
import { notifications } from '@mantine/notifications';
import { ActionIcon, Indicator } from '@mantine/core';
import sound from 'assets/sounds/popup.mp3';
import { IconBrandHipchat, IconMessage } from '@tabler/icons-react';
import { selectUser } from 'features/user';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { socket } from 'socket';
import {
  setOnlineUsers,
  updateChatItemMessage,
  selectChats,
} from '../../chatsSlice';
import { getMyChats } from '../../services';
import classes from './ChatLink.module.scss';

type OnlineUser = {
  userId: string;
  socketId: string;
};

type ReceivedMsgType = {
  _id: number;
  senderId: string;
  content: string;
  senderName: string;
  chatId: string;
};

export default function ChatLink() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);
  const chats = useAppSelector(selectChats);

  const play = () => {
    new Audio(sound).play();
  };

  useEffect(() => {
    if (currentUser?._id) {
      socket.emit('addUser', currentUser._id);
    }
  }, [currentUser?._id]);

  useEffect(() => {
    function getMessage(data: ReceivedMsgType) {
      const chatExist = chats.find((ch) => ch._id === data.chatId);

      if (chatExist) {
        dispatch(updateChatItemMessage(data));
      } else {
        dispatch(getMyChats());
      }

      notifications.show({
        color: 'yellow',
        title: t('msg'),
        icon: <IconMessage size={18} />,
        message: `${data.senderName}: ${data.content} `,
      });
      play();
    }

    function getUsers(users: OnlineUser[]) {
      dispatch(setOnlineUsers(users.map((e) => e.userId)));
    }

    socket.on('getUsers', getUsers);
    socket.on('getMessage', getMessage);

    return () => {
      socket.off('getUsers', getUsers);
      socket.off('getMessage', getMessage);
    };
  }, [dispatch, chats, t]);

  return (
    <Link to={ROUTES.chats} className={classes.iconLink}>
      <Indicator size={12} color='transparent' offset={6}>
        <ActionIcon variant='transparent' size={32} aria-label='Chats'>
          <IconBrandHipchat size={28} />
        </ActionIcon>
      </Indicator>
    </Link>
  );
}
