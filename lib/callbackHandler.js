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
            .json({ state: 'Success', file: playbackState.videofilename });
    }
    else {
        connections[connectID] = true;
        res
            .status(201)
            .json({ state: 'Success', file: playbackState.videofilename });
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
export const onUpdate = (req, res) => {
    // handel all updates.
    ifExitsInConnections(req, res);
    const connectID = req.params.connectID;
    updateConnections(connectID);
    playbackState.playState = req.body.playState;
    playbackState.playbackTime = parseFloat(req.body.playbackTime);
    playbackState.playbackSpeed = parseFloat(req.body.playbackSpeed);
    res.json({ state: 'Success', message: 'changes updated.' });
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
export const getViewers = (req, res) => {
    //returns all currently connected viewers
    res.status(200).json({ state: 'Success', connections });
};
export const deleteAllViewers = (req, res) => {
    // deletes the connections object.
    connections = {};
    res.status(200).json({ state: 'Success', message: 'Deleted all viewers.' });
};
