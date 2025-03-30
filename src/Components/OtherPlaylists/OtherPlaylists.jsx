import React from "react";
import axios from "axios";
import "./OtherPlayLists.scss";
import { useNavigate, useParams } from "react-router-dom";

// ✅ Dynamic API base URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function OtherPlaylists() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlayList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/fullPlaylist`, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        // ✅ Filter out the current playlist (id is now numeric)
        const filtered = data.filter(item => item.id !== parseInt(id));
        setPlayList(filtered);
      })
      .catch(error => console.log("❌ Failed to fetch other playlists:", error));
  }, [id]);

  // ✅ Optional: Hide section if no other playlists
  if (playlist.length === 0) return null;

  return (
    <div className="playlist2">
      {playlist.map(play => (
        <div
          key={play.id}
          className="playlist2__box-other"
          onClick={() => navigate(`/playlist/${play.id}`)}
        >
          <img
            alt="thumbnail"
            className="playlist2__img"
            src={`${BASE_URL}/images/${play.album_image}`}
          />
          <p className="playlist2__name">{play.name}</p>
          <p className="playlist2__description">{play.description}</p>
        </div>
      ))}
    </div>
  );
}

export default OtherPlaylists;
