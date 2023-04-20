import React, {useState, useRef} from "react";
import './App.css';


import song1 from './audio/PARADISE (COLDPLAY) OK..mp3'
import song2 from './audio/01. Тишина ванной комнаты (feat. My Automata).mp3'
import song3 from './audio/02. Случайности (feat. My Automata).mp3'
import song4 from './audio/03. Душевное состояние в ожидании чего-то хорошего (feat. My Automata).mp3'
import song5 from './audio/04. Первая Любовь (feat. My Automata).mp3'
import song6 from './audio/05. Характеры (feat. My Automata).mp3'

function App() {
  const [songs, setSongs] = useState([song1, song2, song3, song4, song5, song6]);
  const audioRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentDisplayTime, setCurrentDisplayTime] = useState('00:00')
  const [progressWidth, setProgressWidth] = useState(0)

  const handleLoadAudio = (event)=> {
    setIsLoaded(true)

  }





  const play = () => {
    audioRef.current.play()
  }
  const pause = () => {
    audioRef.current.pause()
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

  // функция обновления отображения времени и прогресс бара
  const handleTimeUpdate = () => {
    const time = audioRef.current.currentTime
    const percentProgress = (time / audioRef.current.duration) * 100
    setCurrentDisplayTime(formatTime(time))
    setProgressWidth(percentProgress)
  };

  const duration = isLoaded ? formatTime(audioRef.current.duration) : '00:00'

  const changeCurrentTime = (event)=> {
    // Тут проблема. Если кликнуть на голубую область (отмотать назад)
    // То, offsetWidth считается не по всей белой полоске, а по голубой
    // const progressBarWidth = event.target.offsetWidth
    const progressBarWidth = 650
    const click = event.clientX - event.target.offsetLeft
    const percentClicked = (click / progressBarWidth) * 100
    const newTime = audioRef.current.duration / 100 * percentClicked
    audioRef.current.currentTime = newTime
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>player</p>
        <p>{currentDisplayTime} / {duration}</p>
        <audio ref={audioRef}
               onLoadedMetadata={handleLoadAudio}
               onTimeUpdate={handleTimeUpdate}
               controls
               src={song2}>
        </audio>
        <div className='progressBar' onClick={changeCurrentTime}>
          <div className='progress' style={{width: `${progressWidth}%`}}></div>
        </div>
        <button onClick={play}>play</button>
        <button onClick={pause}>pause</button>
      </header>
    </div>
  );
}

export default App;