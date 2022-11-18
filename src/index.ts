import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import { PlaybackStateClass } from './lib/playbackState.js';

// constants
const PORT = process.env.PORT || 3000;

// init.
let playbackState = new PlaybackStateClass();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});
app.use(morgan('dev'));
app.use(function (req: Request, res: Response, next: NextFunction) {
  // adds cors
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// middleware
app.use(express.json());

// Initial Connect
app.get('/', (req: Request, res: Response) => {
  // Adds new viewers
  res.status(200).json({ state: 'Success' });
});

// socket Connection
io.on('connection', (socket) => {
  console.log(`${socket.id} connected.`);

  socket.emit('recieve-update', playbackState);
  // on update.
  socket.on(
    'update',
    (update: {
      playState: boolean;
      playbackTime: number;
      playbackSpeed: number;
    }) => {
      // handel all updates.
      console.log(`update recieved from ${socket.id}`);

      playbackState.playState = update.playState;
      playbackState.playbackTime = update.playbackTime;
      playbackState.playbackSpeed = update.playbackSpeed;

      socket.broadcast.emit('recieve-update', playbackState);
    }
  );
});

// listening.
server.listen(PORT, () => console.log('Listening...', PORT));
