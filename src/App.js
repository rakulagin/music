import React, {useState, useRef} from "react";
import './App.css';
import song from './audio/PARADISE (COLDPLAY) OK..mp3'

function App() {

  const songRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTime, setCurrentTime] = useState('00:00')
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

  // функция обновления отображения времени
  const handleTimeUpdate = () => {
    const time = songRef.current.currentTime
    const percentProgress = time / songRef.current.duration * 100
    setCurrentTime(formatTime(time))
    setProgressWidth(percentProgress)
  };

  // без знака вопроса сюда ничего не приходит и код выпадает в ошибку
  const duration = isLoaded ? formatTime(songRef.current.duration) : '00:00'


  const stylesInline = {
    width: `${progressWidth}%`
  }

  // console.log('текущее', songRef.current?.currentTime)
  // console.log('общее', songRef.current?.duration)
  // console.log('=======')


  return (
    <div className="App">
      <header className="App-header">
        <p>player</p>
        <p>{currentTime} / {duration}</p>
        <audio ref={songRef}
               onLoadedMetadata={() => setIsLoaded(true)}
               onTimeUpdate={handleTimeUpdate}
               controls
               src={song}>
        </audio>
        <div className='progressBar'>
          <div className='progress' style={stylesInline}></div>
        </div>
        <button onClick={play}>play</button>
        <button onClick={pause}>pause</button>
      </header>
    </div>
  );
}

export default App;