import React, {useState, useRef} from "react";
import './App.css';
import song from './audio/PARADISE (COLDPLAY) OK..mp3'

function App() {

  const songRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentDisplayTime, setCurrentDisplayTime] = useState('00:00')
  const [progressWidth, setProgressWidth] = useState(0)

  const play = () => {
    songRef.current.play()
  }
  const pause = () => {
    songRef.current.pause()
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
    const time = songRef.current.currentTime
    const percentProgress = (time / songRef.current.duration) * 100
    setCurrentDisplayTime(formatTime(time))
    setProgressWidth(percentProgress)
  };

  const duration = isLoaded ? formatTime(songRef.current.duration) : '00:00'

  const changeCurrentTime = (event)=> {
    // Тут проблема. если кликнуть на голубую область (отмотать назад)
    // То, offsetWidth считается не по всей белой полоске, а по голубой
    // const progressBarWidth = event.target.offsetWidth
    const progressBarWidth = 650
    const click = event.clientX - event.target.offsetLeft
    const percentClicked = (click / progressBarWidth) * 100
    const newTime = songRef.current.duration / 100 * percentClicked

    songRef.current.currentTime = newTime
    
    console.log('newTime', newTime)
    console.log('progressBarWidth', progressBarWidth)
    console.log('click', click)
    console.log('percentClicked', percentClicked)
    console.log('=====')
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>player</p>
        <p>{currentDisplayTime} / {duration}</p>
        <audio ref={songRef}
               onLoadedMetadata={() => setIsLoaded(true)}
               onTimeUpdate={handleTimeUpdate}
               controls
               src={song}>
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