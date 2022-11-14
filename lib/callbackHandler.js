import { PlaybackStateClass } from './playbackState.js';
let playbackState = new PlaybackStateClass();
// List of viewers connected.
// connectID (string) : hasTOUpdate (bool) .
let connections = {};
const ifExitsInConnections = (req, res) => {
    const connectID = req.params.connectID;
    if (connections[connectID] == undefined) {
        connections[connectID] = true;
    }
};
const updateConnections = (exception) => {
    // will set all connection's hasToUpdate True except for the one
    // who made changes.
    for (let key in connections) {
        if (key !== exception) {
            connections[key] = true;
        }
    }
};
export const connect = (req, res) => {
    // Adds new viewers
    const connectID = req.params.connectID;
    if (connections[connectID] !== undefined) {
        res
            .status(200)
            .json({ state: 'already connected', file: playbackState.videofilename });
    }
    else {
        connections[connectID] = true;
        res
            .status(201)
            .json({ state: 'new connected', file: playbackState.videofilename });
    }
};
export const getAll = (req, res) => {
    // Returns all playback info
    const connectID = req.params.connectID;
    ifExitsInConnections(req, res);
    if (connections[connectID]) {
        // if changes are made
        connections[connectID] = false;
        res.status(201).json(playbackState);
    }
    else {
        // if changes are not made
        res.status(200).json(playbackState);
    }
};
export const playPause = (req, res) => {
    // for pause and play
    ifExitsInConnections(req, res);
    const connectID = req.params.connectID;
    updateConnections(connectID);
    playbackState.playState = !playbackState.playState;
    res.status(200).json(Object.assign({ state: 'Success' }, playbackState));
};
export const setTime = (req, res) => {
    // to update time
    ifExitsInConnections(req, res);
    const connectID = req.params.connectID;
    updateConnections(connectID);
    const time = req.params.time;
    if (!time) {
        res
            .status(418)
            .json({ state: 'Failure', message: 'Time parameter was empty.' });
    }
    playbackState.playbackTime = time;
    res.status(200).json(Object.assign({ state: 'Success' }, playbackState));
};
export const setPlaybackSpeed = (req, res) => {
    // to update playback speed
    ifExitsInConnections(req, res);
    const connectID = req.params.connectID;
    updateConnections(connectID);
    const speed = req.params.speed;
    if (!speed) {
        res
            .status(418)
            .json({ state: 'Failure', message: 'Speed parameter was empty.' });
    }
    playbackState.playbackSpeed = speed;
    res.status(200).json(Object.assign({ state: 'Success' }, playbackState));
};
export const setFileName = (req, res) => {
    // to set filename
    ifExitsInConnections(req, res);
    const connectID = req.params.connectID;
    updateConnections(connectID);
    const filename = req.params.filename;
    if (!filename) {
        res
            .status(418)
            .json({ state: 'Failure', message: 'Filename parameter was empty.' });
    }
    playbackState.videofilename = filename;
    res.status(200).json(Object.assign({ state: 'Success' }, playbackState));
};
