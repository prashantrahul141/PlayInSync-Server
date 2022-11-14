import util from 'util';
export var PlaybackState;
(function (PlaybackState) {
    // Will store all the data related to playback/playing video.
    class PlaybackStateClass {
        // Constructor
        constructor(playState = false, playbackTime = '00:00', playbackSpeed = '1.00', videofileTitle = 'None') {
            this.playState = playState;
            this.playbackTime = playbackTime;
            this.playbackSpeed = playbackSpeed;
            this.videofileTitle = videofileTitle;
        }
        // custom log statement.
        [util.inspect.custom]() {
            return `PlayState : ${this.playState}\nPlaybackTime : ${this.playbackTime}\nPlaybackSpeed : ${this.playbackSpeed}\nVideoFileTitle : ${this.videofileTitle}`;
        }
    }
    PlaybackState.PlaybackStateClass = PlaybackStateClass;
})(PlaybackState || (PlaybackState = {}));
