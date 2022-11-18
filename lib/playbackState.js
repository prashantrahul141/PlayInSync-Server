import util from 'util';
// Will store all the data related to playback/playing video.
export class PlaybackStateClass {
    // Constructor
    constructor(playState = true, playbackTime = 0, playbackSpeed = 1) {
        this.playState = playState;
        this.playbackTime = playbackTime;
        this.playbackSpeed = playbackSpeed;
    }
    // custom log statement.
    [util.inspect.custom]() {
        return `PlayState : ${this.playState}\nPlaybackTime : ${this.playbackTime}\nPlaybackSpeed : ${this.playbackSpeed}`;
    }
}
