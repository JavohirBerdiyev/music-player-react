import React, { useRef, useState } from 'react';
import Player from './components/Players';
import Song from './components/Song';
import Nav from './components/Nav';
import "./App.css";

// Import util
import data from './util';
import Library from './components/Library';

function App() {
  // Ref
  const audioRef = useRef(null)
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });
  const [libraryStatus, setLibraryStatus] = useState(false)
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime:current, duration })
  }

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player 
        setSongInfo={setSongInfo} 
        songInfo={songInfo} 
        audioRef={audioRef} 
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong} />
      <Library 
        audioRef={audioRef}
        isPlaying={isPlaying} 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        libraryStatus={libraryStatus} />
      <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
