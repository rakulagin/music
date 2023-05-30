import React from 'react';
import styles from './Playlist.module.css'

const Playlist = ({currentSongIndex, setCurrentSongIndex, play, songsList}) => {

  const handleSongChoice = (e)=>{
    switch (e.detail) {
      case 1: {
        console.log('single click');
        break;
      }
      case 2: {
        setCurrentSongIndex(e.target.id)
        setTimeout( ()=>{
          play()
        }, 0)
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <div>
      {songsList.map((song, id) => (
        <div
          key={id}
          id={id}
          className={ song.id===Number(currentSongIndex) ? styles.active : ''}
          onClick={(e)=>handleSongChoice(e)}
          >
          {song.artist} - {song.title}
        </div>
      ))}
    </div>


  );
};

export default Playlist;
