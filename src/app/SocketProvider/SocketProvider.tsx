import {
  useContext,
  createContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';
// import { socket as socketIO } from 'socket';

// const defaultState = {
//   socket: socketIO,
// };

const SocketContext = createContext(null);

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export default function SocketProvider({ children }: Props) {
  // const user = useAppSelector(selectUser);

  // const setIoUser = useCallback(() => {
  //   socketIO.emit('newUser', {
  //     user: `${user?.firstName} ${user?.lastName}`,
  //     socketID: socketIO.id,
  //   });
  // }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     setIoUser();
  //   }
  // }, [user, setIoUser]);

  // const value = useMemo(
  //   () => ({
  //     socket: socketIO,
  //   }),
  //   [],
  // );

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
}
