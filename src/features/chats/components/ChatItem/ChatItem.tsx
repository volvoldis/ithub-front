import { Card, Flex, Avatar, Text, Indicator, rem, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { selectUser } from 'features/user';
import { useAppSelector } from 'store/hooks';
import { API_SERVER } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { formatDT } from 'shared/utils';
import { selectActiveChat, selectOnlineUsers } from '../../chatsSlice';
import { IChat } from '../../../types';
import classes from './ChatItem.module.scss';

type ChatItemProps = {
  chat: IChat;
};

export default function ChatItem({ chat }: ChatItemProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useAppSelector(selectUser);
  const activeChat = useAppSelector(selectActiveChat);
  const onlineUsers = useAppSelector(selectOnlineUsers);

  const recipientUser = chat.members.find((member) => member._id !== user?._id);

  const navigateToChat = () => {
    navigate(`${ROUTES.chats}/${chat._id}`);
  };

  const isActive = activeChat._id === chat._id;
  const isOnline = onlineUsers.includes(recipientUser?._id as string);

  const lastMessage =
    chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

  return (
    <Card
      key={chat._id}
      className={`${classes.card} ${isActive ? classes.active : ''}`}
      onClick={navigateToChat}
      p='xs'
    >
      <Flex gap={rem(12)} align='center' className={classes.user}>
        <Indicator
          inline
          size={10}
          offset={6}
          position='bottom-end'
          color={isOnline ? 'green' : 'red'}
        >
          <Avatar src={`${API_SERVER}/${recipientUser?.avatar}`} />
        </Indicator>
        <Flex direction='column' className={classes.content}>
          <Text className={classes.user}>
            {recipientUser?.firstName} {recipientUser?.lastName}
          </Text>
          <Flex className={classes.message}>
            {lastMessage ? (
              <>
                <Group gap={3} align='flex-end' wrap='nowrap'>
                  <Text c='blue' fz='sm'>
                    {lastMessage?.senderId !== user?._id
                      ? recipientUser?.firstName
                      : user.firstName}
                    :
                  </Text>
                  <Text truncate='end' fz='sm'>
                    {lastMessage?.content}
                  </Text>
                </Group>
                <Text fz={rem(10)} truncate='end'>
                  {formatDT(lastMessage.createdAt, true)}
                </Text>
              </>
            ) : (
              <Text fz='sm'>{t('no_messages')}</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
