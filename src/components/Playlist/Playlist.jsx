import React from 'react';
import styles from './Playlist.module.css'

const Playlist = ({currentSongIndex, songsList}) => {

  return (
    <div>
      {songsList.map((song, id) => (
        <div
          key={id}
          className={ song.id==currentSongIndex ? styles.active : ''}
          >
          {song.artist} - {song.title}
        </div>
      ))}
    </div>


  );
};

export default Playlist;
