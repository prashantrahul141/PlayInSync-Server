// imports
import {
  getAll,
  onUpdate,
  setFileName,
  connect,
  getViewers,
  deleteAllViewers,
} from './lib/callbackHandler.js';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

// constants
const PORT = process.env.PORT || 3000;
// init.
const app = express();
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
app.use(express.json());

// Routes
// pulling changes
app.get('/:connectID', getAll);

// new user connected
app.post('/:connectID', connect);

// will handel all changes.
app.post('/update/:connectID', onUpdate);

// change video file name
app.get('/setfilename/:connectID/:filename', setFileName);

// get all viwers.
app.get('/allviewers/:connectID', getViewers);

// delete all viwers.
app.get('/deleteall/:connectID', deleteAllViewers);

// listening.
// @ts-ignore
app.listen(PORT, '0.0.0.0', () => console.log('Listening...', PORT));
