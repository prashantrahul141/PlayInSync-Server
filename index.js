// imports
import { getAll, playPause, setTime, setPlaybackSpeed, setFileName, connect, getViewers, deleteAllViewers, } from './lib/callbackHandler.js';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
// constants
const PORT = process.env.PORT || 3000;
// init.
const app = express();
app.use(morgan('dev'));
// Routes
// pulling changes
app.get('/:connectID', getAll);
// new user connected
app.post('/:connectID', connect);
// play or pause
app.get('/playpause/:connectID', playPause);
// change play back time
app.get('/settime/:connectID/:time', setTime);
// change playback speed
app.get('/setplaybackspeed/:connectID/:speed', setPlaybackSpeed);
// change video file name
app.get('/setfilename/:connectID/:filename', setFileName);
// get all viwers.
app.get('/allviewers/:connectID', getViewers);
// delete all viwers.
app.get('/deleteall/:connectID', deleteAllViewers);
// listening.
// @ts-ignore
app.listen(PORT, '0.0.0.0', () => console.log('Listening...', PORT));
