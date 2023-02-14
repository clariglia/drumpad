import { useEffect, useState } from "react";
const MicRecorder = require("mic-recorder-to-mp3");
function DrumPad() {
  const data = [
    {
      key: "Q",
      id: "Heat-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      key: "W",
      id: "Heat-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      key: "E",
      id: "Heat-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      key: "A",
      id: "Heat-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      key: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      key: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      key: "Z",
      id: "Kick-n-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      key: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      key: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];
  const [Recorder, setRecorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [isRecording, setIsRecording] = useState(false);
  const [blob, setBlob] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const startRecording = () => {
    if (isBlocked) {
      alert("Permisso approvato");
    } else {
      Recorder.start()
        .then(() => {
          setBlob("");
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };
  const stopRecording = () => {
    Recorder.stop()
      .getMp3()
      .then((blob) => {
        const blobURL = URL.createObjectURL(new Blob(blob));
        setBlob(blobURL);
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    document.title = "Badabum tss";
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permesso approvato");
        setIsBlocked(false);
      },
      () => {
        console.log("Permesso rifiutato");
        setIsBlocked(true);
      }
    );
  });


  return (
    <div className="app">
      <div className="drum">
        {data.map((d) => {
          return (
            <button
              key={d.id}
              className="btn btn-default pad"
              onClick={() => {
                const audio = new Audio(d.url);
                audio.play();
              }}
            >
              {d.key}
            </button>
          );
        })}
      </div>
      <div className="panelRecorder">
        <button
          className="btn btn-default"
          onClick={(e) =>
            startRecording({ Recorder, isBlocked, setBlob, setIsRecording })
          }
          disabled={isRecording}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-record2" viewBox="0 0 16 16">
            <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
            <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
          </svg>
        </button>
        <button
          className="btn btn-default"
          onClick={(e) => stopRecording({ Recorder, setBlob, setIsRecording })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-stop-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z" />
          </svg>
        </button>
        <button className="btn-default btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DrumPad;
