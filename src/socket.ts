import { io } from 'socket.io-client';
import { API_SERVER } from 'shared/constants';

export const socket = io(API_SERVER!);
