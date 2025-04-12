import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader"; // adjust path as needed
import video1 from "../../assets/video1.mp4";
import "./Playlist.scss";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const PlayList = () => {
  const navigate = useNavigate();
  const [playlist, setPlayList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowCountdown(true);
    }

    axios
      .get(`${BASE_URL}/fullPlaylist`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setPlayList(response.data);
        setLoading(false);
        if (!hasVisited) {
          sessionStorage.setItem("hasVisited", "true");
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching playlists:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader showCountdown={showCountdown} />;

  return (
    <motion.div
      className="playlist"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video autoPlay loop muted className="playlist__videobg">
        <source src={video1} type="video/mp4" />
      </video>

      <h1 className="playlist__Title">Discover Sound</h1>
      <div className="playlist__heading">FEATURED PLAYLIST</div>

      <div className="playlist__container">
        {playlist?.map((play) => (
          <div
            key={play.id}
            className="playlist__box"
            onClick={() => navigate(`/playlist/${play.id}`)}
          >
            <img
              alt={play.name || "Playlist Thumbnail"}
              className="playlist__img"
              src={
                play?.album_image
                  ? `${BASE_URL}/images/${play.album_image}`
                  : "/placeholder.jpg"
              }
            />
            <p className="playlist__name">{play.name}</p>
            <p className="playlist__description">{play?.description}</p>
          </div>
        ))}
      </div>

      <div className="playlist__infobox">
        <div className="playlist__infoContent">
          <div>
            <h1 className="playlist__infoH1">Join us</h1>
            <h4 className="playlist__infoH4">
              Be the first to know about product news and community activities.
            </h4>
          </div>
          <div>
            <input className="playlist__input" placeholder="Enter your email" />
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayList;