import React, {useState, useRef} from "react";
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

  // хелпер перевода времени в красивое значение, получает на вход 1.540950495, возвращает 01:00
  const formatTime = (time) => {
    if (!time) return
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return (`${formatMinutes}:${formatSeconds}`)
  }

  // функция обновления отображения времени
  const handleTimeUpdate = () => {
    const time = myRef.current.currentTime
    setCurrentTime(formatTime(time))
  };

  // без знака вопроса сюда ничего не приходит и код выпадает в ошибку
  const duration = formatTime(myRef.current?.duration)

  return (
    <div className="App">
      <header className="App-header">
        <p>player</p>
        <p>{currentTime} / {duration}</p>
        <audio ref={myRef} onTimeUpdate={handleTimeUpdate} controls src={song}></audio>
        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
      </header>
    </div>
  );
}

export default App;