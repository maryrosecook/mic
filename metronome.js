class Metronome {
  constructor () {
    this._setState("stopped");
    this._sound = new Audio("metronome.wav");
  }

  toggle () {
    this[{
      stopped: "_playForever",
      playing: "_stop"
    }[this._state]]();
  }

  _playForever () {
    this._setState("playing");
    this._sound.play();
    this._playingInterval = setInterval(() => {
      this._sound.pause();
      this._sound.currentTime = 0;
      this._sound.play();
    }, 2000);
  }

  _stop () {
    clearInterval(this._playingInterval);
    this._setState("stopped");
    this._sound.pause();
    this._sound.currentTime = 0;
  }

  _setState (state) {
    this._state = state;
  }
}
