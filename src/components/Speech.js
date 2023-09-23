import React, { useState } from 'react';
import axios from 'axios';

function TextToSpeechAPI({ text, lang }) {
  const [isPlaying, setIsPlaying] = useState(false); // Add a state variable to keep track of whether the audio is playing or not

  const options = {
    method: 'GET',
    url: 'https://text-to-speech-api3.p.rapidapi.com/speak',
    params: {
      text: text,
      lang: lang
    },
    responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
    headers: {
      'X-RapidAPI-Key': '08c766dfb2msh6d00b8d4358723ep1a2161jsn420366549ee8',
      'X-RapidAPI-Host': 'text-to-speech-api3.p.rapidapi.com'
    }
  };

  const speakText = async () => {
    if (isPlaying) { // If the audio is already playing, return without doing anything
      return;
    }

    try {
      setIsPlaying(true); // Set the 'isPlaying' state to true
      const response = await axios.request(options);
      const audio = new Audio(URL.createObjectURL(new Blob([response.data])));
      audio.play();
      audio.addEventListener('ended', () => setIsPlaying(false)); // Set the 'isPlaying' state to false when the audio finishes playing
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={speakText}>Speak Text</button>
    </div>
  );
}

export default TextToSpeechAPI;