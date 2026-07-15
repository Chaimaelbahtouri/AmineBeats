import api from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [song, setSong] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/songs")
      .then((res) => setSong(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredSongs = song.filter((s) =>
    s.title.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="search-page">

      {/* INPUT */}
      <div className="search-box">
        <input
          type="search"
          value={input}
          placeholder="Search for songs..."
          onChange={(e) => setInput(e.target.value)}
          className="search-input"
        />
      </div>

      {/* RESULTS */}
      <div className="results">
        {input && filteredSongs.map((track) => (
          <div
            key={track._id}
            className="song-item"
            onClick={() => navigate(`/song/${track._id}`)}
          >
          <img
            src={
              track.coverImage?.startsWith("http")
                ? track.coverImage
                : `http://localhost:5000/images/${track.coverImage}`
            }
            alt={track.title}
            className="song-img"
          />

            <div className="song-info">
              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}