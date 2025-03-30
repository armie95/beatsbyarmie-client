import React from "react";
import axios from "axios";
import "./SongsList.scss";
import Song from "../Song/Song";
import { useParams } from "react-router-dom";
import SongPlayer from "../SongPlayer/SongPlayer";
import CommentsSection from "../CommentsSection/CommentsSection";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import Container from "../Container/Container";

// ✅ Use env variable or fallback
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

function SongsList() {
  const { id } = useParams();
  const linkAudio = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [songs, setSongs] = React.useState([]);
  const [currentSong, setCurrentSong] = React.useState(null);
  const [playlist, setPlaylist] = React.useState({});
  const [comment, setComment] = React.useState("");

  // ✅ Fetch playlist + songs
  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/playlistSongs/${id}`)
      .then(res => {
        setSongs(res.data.songs);
        setPlaylist(res.data.playlist);
        setCurrentSong(res.data.songs[0]);
      })
      .catch(err => console.error("❌ Failed to fetch playlistSongs", err));
  }, [id]);

  // ✅ Add comment
  const addComment = e => {
    e.preventDefault();
    axios
      .post(
        `${BASE_URL}/addComment`,
        {
          comment,
          playlistId: parseInt(id), // match backend param
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(res => {
        setPlaylist(res.data.playlist);
        setSongs(res.data.songs);
        setCurrentSong(res.data.songs[0]);
        setComment("");
      })
      .catch(err => {
        console.error("❌ Failed to add comment", err);
      });
  };

  const handleShuffle = e => {
    e.preventDefault();
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    setSongs(shuffled);
  };

  React.useEffect(() => {
    if (!linkAudio.current) return;
    isPlaying ? linkAudio.current.play() : linkAudio.current.pause();
  }, [isPlaying, currentSong]);

  return (
    <div className="songs">
      <audio src={`${BASE_URL}/audio/${currentSong?.wavfile}`} ref={linkAudio} />
      <SongPlayer
        isPlaying={isPlaying}
        currentSong={currentSong}
        setIsPlaying={setIsPlaying}
        handleShuffle={handleShuffle}
      />
      <Container>
        <h3 className="songs__title">Latest Album</h3>
        <div className="songs__wrapperbox">
          <div className="songs__songsbox">
            {songs.map(song => (
              <Song
                key={song.id}
                song={song}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
              />
            ))}
            <NewCommentForm comment={comment} setComment={setComment} addComment={addComment} />
            <CommentsSection playlist={playlist} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SongsList;
