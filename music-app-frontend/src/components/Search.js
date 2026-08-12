import api from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [songs, setSongs] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.title?.toLowerCase().includes(input.toLowerCase())
  );

  const getImage = (coverImage) => {
    if (!coverImage) return "";

    return coverImage.startsWith("http")
      ? coverImage
      : `http://localhost:5000/images/${coverImage}`;
  };

  return (
    <div className="new-search-page">

      <div className="new-search-header">
        <h1>Search</h1>
        <p>Find your favorite music</p>
      </div>

      <div className="new-search-input-wrapper">
        <span className="new-search-icon">⌕</span>

        <input
          type="search"
          value={input}
          placeholder="Search for songs..."
          onChange={(e) => setInput(e.target.value)}
          className="new-search-input"
        />

        {input && (
          <button
            className="new-search-clear"
            onClick={() => setInput("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="new-search-results">

        {!input ? (
          <div className="new-search-empty">
            <div className="new-search-empty-icon">♪</div>
            <h2>Search for music</h2>
            <p>Type a song name to start searching</p>
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className="new-search-empty">
            <div className="new-search-empty-icon">⌕</div>
            <h2>No songs found</h2>
            <p>Try searching with another name</p>
          </div>
        ) : (
          <>
            <div className="new-search-count">
              {filteredSongs.length}{" "}
              {filteredSongs.length === 1 ? "song" : "songs"} found
            </div>

            {filteredSongs.map((song) => (
              <div
                key={song._id}
                className="new-search-song"
                onClick={() => navigate(`/song/${song._id}`)}
              >
                <img
                  src={getImage(song.coverImage)}
                  alt={song.title}
                  className="new-search-cover"
                />

                <div className="new-search-song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>

                <div className="new-search-arrow">
                  →
                </div>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
}