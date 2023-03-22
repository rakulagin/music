import React, {useState, useRef, useEffect} from "react";
import './App.css';
import song from './audio/PARADISE (COLDPLAY) OK..mp3'

function App() {

  const myRef = useRef(null)

  const [currentTime, setCurrentTime] = useState('00:00')

  const play = () => {
    myRef.current.play()
  }
  const stop = () => {
    myRef.current.pause()
  }

  const handleTimeUpdate = () => {
    const time = myRef.current.currentTime
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    setCurrentTime(`${formatMinutes}:${formatSeconds}`)
  };
  





  return (
    <div className="App">
      <header className="App-header">
        <p>player</p>
        <p>{currentTime}</p>
        <audio ref={myRef} onTimeUpdate={handleTimeUpdate} controls src={song}></audio>
        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
      </header>
    </div>
  );
}

export default App;
