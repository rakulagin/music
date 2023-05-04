import React, {useState, useRef} from "react";
import './App.css';
import {songsList} from "./audio/audio";


function App() {
  const [songs, setSongs] = useState(songsList);
  const [numberSongs, setNumberSongs] = useState(songsList.length);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audioRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentDisplayTime, setCurrentDisplayTime] = useState('00:00')
  const [progressWidth, setProgressWidth] = useState(0)
  const [volume, setVolume] = useState(1);

  const [played, setPlayed] = useState(false);

  const handleLoadAudio = (event)=> {
    setIsLoaded(true)
  }

  const handleVolumeChange = (event)=> {
    console.log("volume внутри 1", volume)
    audioRef.current.volume = volume
    setVolume(event.target.value);
    console.log("volume внутри 2", volume)
  }

  const play = () => {
    audioRef.current.play()
    setPlayed(true)
  }
  const pause = () => {
    audioRef.current.pause()
    setPlayed(false)
  }
  const stop = ()=> {
    pause()
    audioRef.current.currentTime=0
    setPlayed(false)
  }
  const next = () => {
    setIsLoaded(false)
    if(currentSongIndex+1 < songsList.length) {
      setCurrentSongIndex(currentSongIndex+1)
    } else {
      setCurrentSongIndex(0)
    }
    if(played) {
    setTimeout( ()=>{
    audioRef.current.play()
    }, 0)
    }
  }
  const prev = ()=> {
    setIsLoaded(false)
    if (currentSongIndex === 0) {
      console.log('000')
      setCurrentSongIndex(songsList.length-1)
    } else {
      setCurrentSongIndex(currentSongIndex-1)
    }
    if(played) {
      setTimeout( ()=>{
        audioRef.current.play()
      }, 0)
    }
  }

  // хелпер перевода времени в красивое значение, получает на вход 1.540950495, возвращает 01:00
  const formatTime = (time) => {
    if (!time) return '00:00'
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



  const mute = () => {
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = 1
    } else {
      audioRef.current.volume = 0
    }
  }

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

  // console.log('songsList.length', songsList.length)
  // console.log('currentSong', currentSongIndex)
  // console.log('now playing---', songsList[currentSongIndex].artist, songsList[currentSongIndex].title)
  // console.log('currentDisplayTime', currentDisplayTime)
  // console.log("volume outside", volume)
  console.log(played)


  return (
    <div className="App">
      <header className="App-header">
        <p>player</p>
        <p>{songsList[currentSongIndex].artist} - {songsList[currentSongIndex].title}</p>
        <p>{currentDisplayTime} / {duration}</p>
        <audio ref={audioRef}
               // onVolumeChange={handleVolumeChange}
               onLoadedMetadata={handleLoadAudio}
               onTimeUpdate={handleTimeUpdate}
               controls
               src={songsList[currentSongIndex].src}>
        </audio>
        <div className='progressBar' onClick={changeCurrentTime}>
          <div className='progress' style={{width: `${progressWidth}%`}}></div>
        </div>
        {played ? (
          <button onClick={pause}>pause</button>
        ) : (
          <button onClick={play}>play</button>
        )}
        <button onClick={stop}>stop</button>
        <button onClick={next}>next</button>
        <button onClick={prev}>prev</button>
        <button onClick={mute}>mute</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </header>
    </div>
  );
}

export default App;