import util from 'util';
// Will store all the data related to playback/playing video.
export class PlaybackStateClass {
    // Constructor
    constructor(playState = false, playbackTime = '00:00', playbackSpeed = '1.00', videofilename = 'None') {
        this.playState = playState;
        this.playbackTime = playbackTime;
        this.playbackSpeed = playbackSpeed;
        this.videofilename = videofilename;
    }
    // custom log statement.
    [util.inspect.custom]() {
        return `PlayState : ${this.playState}\nPlaybackTime : ${this.playbackTime}\nPlaybackSpeed : ${this.playbackSpeed}\nVideoFileTitle : ${this.videofilename}`;
    }
}
