function setup(recorder,
               metronome,
               recordings,
               recordButton,
               metronomeButton,
               recordingsElement,
               createDomElement) {
  bindRecordHandler(
    recorder,
    recordButton);

  bindNewRecordingHandler(
    recorder,
    recordings,
    recordingsElement,
    createDomElement);

  bindMetronomeHandler(
    metronome,
    metronomeButton);
};

const createDomElement = (function (document) {
  return function(type) {
    return document.createElement(type);
  };
})(document);

function bindRecordHandler(recorder, recordButton) {
  recordButton.addEventListener("click", () => recorder.toggle());
};

function bindNewRecordingHandler(recording,
                                 recordings,
                                 recordingsElement,
                                 createDomElement) {
  recording.onNewRecording(recording => {
    recordings.push(recording);
    showRecording(createDomElement,
                  recording,
                  `clip ${recordings.length}`,
                  recordingsElement);
  });
};

function bindMetronomeHandler(metronome, metronomeButton) {
  metronomeButton.addEventListener("click", () => metronome.toggle());
};

function showRecording(createDomElement,
                       recording,
                       name,
                       recordingsElement) {
  const button = createDomElement("button");
  button.innerHTML = name;
  button.addEventListener("click", () => recording.play());
  recordingsElement.appendChild(button);
};

setup(
  new EndlessRecorder(),
  new Metronome(),
  [],
  document.getElementById("record"),
  document.getElementById("metronome"),
  document.getElementById("recordings"),
  createDomElement
);
