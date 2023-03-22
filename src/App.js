import React, {useRef} from "react";
import './App.css';
import song from './audio/PARADISE (COLDPLAY) OK..mp3'

function App() {

  const myRef = useRef()

  const play = () => {
    myRef.current.play()
  }

  const stop = () => {
    myRef.current.pause()
  }

  console.log(song)

  return (
    <div className="App">
      <header className="App-header">
        <p>player</p>
        <audio ref={myRef} controls src={song}></audio>
        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
      </header>
    </div>
  );
}

export default App;
