import axios from "axios";
import React, { useState } from "react";

function TextToSpeechAPI({ text, lang }) {
  const [isPlaying, setIsPlaying] = useState(false); // Add a state variable to keep track of whether the audio is playing or not

  const options = {
    method: "GET",
    url: "https://text-to-speech-api3.p.rapidapi.com/speak",
    params: {
      text: text,
      lang: lang,
    },
    responseType: "arraybuffer", // Set the response type to 'arraybuffer'
    headers: {
      "X-RapidAPI-Key": "08c766dfb2msh6d00b8d4358723ep1a2161jsn420366549ee8",
      "X-RapidAPI-Host": "text-to-speech-api3.p.rapidapi.com",
    },
  };

  const speakText = async () => {
    if (isPlaying) {
      // If the audio is already playing, return without doing anything
      return;
    }

    try {
      setIsPlaying(true); // Set the 'isPlaying' state to true
      const response = await axios.request(options);
      const audio = new Audio(URL.createObjectURL(new Blob([response.data])));
      audio.play();
      audio.addEventListener("ended", () => setIsPlaying(false)); // Set the 'isPlaying' state to false when the audio finishes playing
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div>
      <div className="speech-container">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={speakText}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default TextToSpeechAPI;
