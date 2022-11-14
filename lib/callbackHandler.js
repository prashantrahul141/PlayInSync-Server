import { PlaybackStateClass } from './playbackState.js';
let playbackState = new PlaybackStateClass();
export const getAll = (req, res) => {
    res.status(200).json(playbackState);
};
export const playPause = (req, res) => {
    playbackState.playState = !playbackState.playState;
    res.status(200).json(playbackState.playState);
};
export const setTime = (req, res) => {
    const { time } = req.params;
    if (!time) {
        res.status(418).send('Time parameter was empty.');
    }
    playbackState.playbackTime = time;
    res.status(200).json(playbackState.playbackTime);
};
export const setPlaybackSpeed = (req, res) => {
    const { speed } = req.params;
    if (!speed) {
        res.status(418).json('Speed parameter was empty.');
    }
    playbackState.playbackSpeed = speed;
    res.status(200).json(playbackState.playbackSpeed);
};
export const setFileName = (req, res) => {
    const { filename } = req.params;
    if (!filename) {
        res.status(418).json('FIlename parameter was empty.');
    }
    playbackState.videofilename = filename;
    res.status(200).json(playbackState.videofilename);
};
