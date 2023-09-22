import React, { useState, useEffect } from 'react';

function TextToSpeech({ text, lang }) {
  const [selectedLanguage, setSelectedLanguage] = useState(lang); // Set initial language based on the 'lang' prop
  const [utteranceText, setUtteranceText] = useState(text); // Use a separate state for the utterance text
  const synth = window.speechSynthesis;

  // Update the 'utteranceText' state when 'text' prop changes
  useEffect(() => {
    setUtteranceText(text);
  }, [text]);

  useEffect(() => {
    // This effect will run whenever the selectedLanguage or utteranceText changes
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    console.log("🚀 ~ file: Speech.js:16 ~ useEffect ~ utteranceText:", utteranceText)
    utterance.lang = selectedLanguage; // Set the language
    console.log("🚀 ~ file: Speech.js:18 ~ useEffect ~ lang:", lang)
    synth.speak(utterance);
  }, [selectedLanguage, utteranceText]);

  const speakText = () => {
    if (!utteranceText) {
      alert('Please enter text to speak.');
      return;
    }
  };

  const stopSpeaking = () => {
    synth.cancel();
  };

  const setText = (newText) => {
    setUtteranceText(newText);
  };

  return (
    <div>
      {/* Render your TextToSpeech component here */}
    </div>
  );
}

export default TextToSpeech;