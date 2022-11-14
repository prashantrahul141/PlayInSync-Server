import util from 'util';

// Will store all the data related to playback/playing video.
export class PlaybackStateClass {
  // Constructor
  constructor(
    public playState: boolean = false,
    public playbackTime: string = '00:00',
    public playbackSpeed: string = '1.00',
    public videofileTitle: string = 'None'
  ) {}

  // custom log statement.
  [util.inspect.custom]() {
    return `PlayState : ${this.playState}\nPlaybackTime : ${this.playbackTime}\nPlaybackSpeed : ${this.playbackSpeed}\nVideoFileTitle : ${this.videofileTitle}`;
  }
}
