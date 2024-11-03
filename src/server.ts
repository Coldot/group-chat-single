import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import next from 'next';

const app = express();
const server = createServer(app);
const io = new Server(server);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', ({ roomId, nickname }) => {
      socket.join(roomId);
      socket.to(roomId).emit('message', {
        user: 'system',
        text: `${nickname}님이 입장하셨습니다.`,
      });
    });

    socket.on('sendMessage', ({ roomId, user, text }) => {
      io.to(roomId).emit('message', { user, text });
    });
  });

  app.all('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});