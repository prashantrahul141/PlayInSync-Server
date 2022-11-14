// imports
import {
  getAll,
  playPause,
  setTime,
  setPlaybackSpeed,
  setFileName,
} from './lib/callbackHandler.js';
import express from 'express';
import morgan from 'morgan';

// constants
const PORT = 3000;

// init.
const app = express();
app.use(morgan('dev'));

// Routes
app.get('/', getAll);
app.get('/playpause', playPause);
app.post('/settime/:time', setTime);
app.post('/setplaybackspeed/:speed', setPlaybackSpeed);
app.post('/setfilename/:filename', setFileName);

// listening.
app.listen(PORT, () => console.log('Listening...'));
