import { Request, Response } from 'express';
import { PlaybackStateClass } from './playbackState.js';

let playbackState = new PlaybackStateClass();

// List of viewers connected.
// connectID (string) : hasTOUpdate (bool) .
let connections: any = {};

const updateConnections = (exception: string) => {
  // will set all connection's hasToUpdate True except for the one
  // who made changes.
  for (let key in connections) {
    if (key !== exception) {
      connections[key] = true;
    }
  }
};

export const connect = (req: Request, res: Response) => {
  // Adds new viewers
  const connectID = req.params.connectID;
  if (connections[connectID] !== undefined) {
    res.status(200).json('Already Connected.');
  } else {
    connections[connectID] = true;
    res.status(200).json('New User Connected.');
  }
  console.log(connections);
};

export const getAll = (req: Request, res: Response) => {
  // Returns all playback info
  const connectID = req.params.connectID;
  if (connections[connectID]) {
    // if changes are made
    connections[connectID] = false;
    res.status(201).json(playbackState);
  } else {
    // if changes are not made
    res.status(200).json(playbackState);
  }
};

export const playPause = (req: Request, res: Response) => {
  // for pause and play
  const connectID = req.params.connectID;
  updateConnections(connectID);
  playbackState.playState = !playbackState.playState;
  res.status(200).json(playbackState.playState);
};

export const setTime = (req: Request, res: Response) => {
  // to update time
  const connectID = req.params.connectID;
  updateConnections(connectID);
  const time = req.params.time;
  if (!time) {
    res.status(418).send('Time parameter was empty.');
  }
  playbackState.playbackTime = time;
  res.status(200).json(playbackState.playbackTime);
};

export const setPlaybackSpeed = (req: Request, res: Response) => {
  // to update playback speed
  const connectID = req.params.connectID;
  updateConnections(connectID);
  const speed = req.params.speed;
  if (!speed) {
    res.status(418).json('Speed parameter was empty.');
  }
  playbackState.playbackSpeed = speed;
  res.status(200).json(playbackState.playbackSpeed);
};

export const setFileName = (req: Request, res: Response) => {
  // to set filename
  const connectID = req.params.connectID;
  updateConnections(connectID);
  const filename = req.params.filename;
  if (!filename) {
    res.status(418).json('FIlename parameter was empty.');
  }
  playbackState.videofilename = filename;
  res.status(200).json(playbackState.videofilename);
};
