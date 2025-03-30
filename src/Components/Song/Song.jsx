import "./Song.scss";
import React from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import image_placeholder from "../../assets/images/image_placeholder.jpeg";

// ✅ Use dynamic backend URL for image loading
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Song = ({ song, isPlaying, currentSong, setIsPlaying, setCurrentSong }) => {
  const selectSong = () => {
    setCurrentSong(song);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentSong(song);
  };

  return (
    <div className="song">
      <div className="song__thumbnail-container" onClick={selectSong}>
        <img
          src={song?.album_image ? `${BASE_URL}/images/${song.album_image}` : image_placeholder}
          alt="thumbnail"
          className="song__thumbnail"
        />
      </div>
      <p onClick={selectSong} className="song__name">
        {song?.name || "name"}
      </p>
      <p onClick={selectSong} className="song__duration">
        {song?.duration || "duration"}
      </p>
      <p className="song__bpm">{song?.bpm || "bpm"}</p>
      <p className="song__views">{song?.views || "views"}</p>
      <div className="song__btns">
        {currentSong.id === song.id && isPlaying ? (
          <BsFillPauseFill
            className="songList__icon song__play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          />
        ) : (
          <BsFillPlayFill className="songList__icon song__play-btn" onClick={handlePlay} />
        )}
      </div>
    </div>
  );
};

export default Song;
