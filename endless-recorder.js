class EndlessRecorder {
  constructor () {
    this._newRecordingListeners = [];
    this._setupRecorder();
  }

  toggle () {
    this[{
      busy: "_toggleWhenBusy",
      readyToRecord: "_record",
      recording: "_stopAndReadyForNextRecording"
    }[this._state]]();
  }

  onNewRecording (listener) {
    this._newRecordingListeners.push(listener);
  }

  _alertListenersAboutNewRecording (recording) {
    this
      ._newRecordingListeners
      .forEach(listener => listener(recording));
  }

  async _setupRecorder () {
    this._setState("busy");
    this._recorder = await recordAudio();
    this._setState("readyToRecord");
  }

  _setState (state) {
    this._state = state;
  }

  _toggleWhenBusy () {
    // queue toggle in the future?
  }

  _record () {
    this._recorder.start();
    this._setState("recording");
  }

  async _stopAndReadyForNextRecording () {
    this._setState("busy");
    this._alertListenersAboutNewRecording(await this._recorder.stop());
    this._recorder = await recordAudio();
    this._setState("readyToRecord");
  }
};
