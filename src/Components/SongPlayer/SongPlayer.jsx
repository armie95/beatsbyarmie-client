import React from "react";
import "./SongPlayer.scss";
import { BsFillPlayFill, BsFillPauseFill, BsShuffle } from "react-icons/bs";
import image_placeholder from "../../assets/images/image_placeholder.jpeg";
import video1 from "../../assets/video1.mp4";

// ✅ Dynamic backend URL (via Vite)
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const SongPlayer = ({ currentSong, isPlaying, setIsPlaying, handleShuffle }) => {
  return (
    <div className="songList">
      {/* ✅ Optional: Comment this out if you don't want the background video */}
      <video autoPlay loop muted className="songList__videobg">
        <source src={video1} type="video/mp4" />
      </video>

      <div className="songList__content-container">
        <div className="songList__content">
          <div className="songList__content-row">
            <img
              src={
                currentSong?.album_image
                  ? `${BASE_URL}/images/${currentSong.album_image}`
                  : image_placeholder
              }
              alt={currentSong?.name || "Album thumbnail"}
              className="songList__thumbnail"
            />
            <div>
              <span className="songList__name">{currentSong?.name || "Unknown Track"}</span>
              <br />
              <span className="songList__name">{currentSong?.duration || "Duration: --"}</span>
            </div>
          </div>

          <div className="songList__btns">
            {isPlaying ? (
              <BsFillPauseFill
                className="songList__icon songList__play-btn"
                onClick={() => setIsPlaying(false)}
              />
            ) : (
              <BsFillPlayFill
                className="songList__icon songList__play-btn"
                onClick={() => setIsPlaying(true)}
              />
            )}
            <BsShuffle className="songList__icon songList__shuffle-btn" onClick={handleShuffle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPlayer;
