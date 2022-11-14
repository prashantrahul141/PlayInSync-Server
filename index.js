// imports
import { getAll, playPause, setTime, setPlaybackSpeed, setFileName, } from './lib/callbackHandler.js';
import express from 'express';
// constants
const PORT = 3000;
// init.
const app = express();
app.get('/', getAll);
app.get('/playpause', playPause);
app.post('/settime/:time', setTime);
app.post('/setplaybackspeed/:speed', setPlaybackSpeed);
app.post('/setfilename/:filename', setFileName);
// listening.
app.listen(PORT, () => console.log('Listening...'));
