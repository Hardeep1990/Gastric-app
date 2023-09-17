const speechSynthesis = window.speechSynthesis;
const handleAudioClick = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

export default handleAudioClick;
