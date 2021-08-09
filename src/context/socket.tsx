import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@utils/constants/urls';

export const socket = io(BASE_URL || '', {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  secure: true,
});

export const SocketContext = createContext<Socket>(socket);
