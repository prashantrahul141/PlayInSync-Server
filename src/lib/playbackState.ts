import util from 'util';

// Will store all the data related to playback/playing video.
export class PlaybackStateClass {
  // Constructor
  constructor(
    public playState: boolean = true,
    public playbackTime: string = '0',
    public playbackSpeed: string = '1',
    public videofilename: string = 'None'
  ) {}

  // custom log statement.
  [util.inspect.custom]() {
    return `PlayState : ${this.playState}\nPlaybackTime : ${this.playbackTime}\nPlaybackSpeed : ${this.playbackSpeed}\nVideoFileTitle : ${this.videofilename}`;
  }
}
