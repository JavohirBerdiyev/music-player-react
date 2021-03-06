import React from 'react';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faAngleLeft,
  faPlay,
  faAngleRight,
  faPause  
} from '@fortawesome/free-solid-svg-icons'

const Player = ({setSongInfo,songInfo,audioRef,currentSong, isPlaying, setIsPlaying}) => {
  
  // Event Handlers
  const playSongHandler = () => {
    if(isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input 
          min={0} 
          max={songInfo.duration || 0} 
          onChange={dragHandler}
          value={songInfo.currentTime}
          type="range" />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} />
        <FontAwesomeIcon 
          onClick={playSongHandler} 
          className="play" 
          icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-forward" icon={faAngleRight} />
      </div>
    </div>
  )
}

export default Player;