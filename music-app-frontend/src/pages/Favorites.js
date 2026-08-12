import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import {
  FaHeart,
  FaPause,
  FaPlay,
  FaRegTrashAlt,
  FaArrowLeft,
} from "react-icons/fa";

export default function FavoritesPage() {
  const nav = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [activeSongId, setActiveSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const backClick = () => {
    nav("/PlaylistPage");
  };

  const handleClick = (songId) => {
    if (activeSongId === songId) {
      setIsPlaying((prev) => !prev);
    } else {
      setActiveSongId(songId);
      setIsPlaying(true);
    }
  };

  const removedClick = (song) => {
    const updated = favorites.filter(
      (s) => s._id !== song._id
    );

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    if (activeSongId === song._id) {
      setActiveSongId(null);
      setIsPlaying(false);
    }
  };

  const getImage = (coverImage) => {
    if (!coverImage) {
      return logo;
    }

    return coverImage.startsWith("http")
      ? coverImage
      : `http://localhost:5000/images/${coverImage}`;
  };

  return (
    <div className="favorites">

      {/* =========================
          EMPTY FAVORITES
      ========================= */}

      {favorites.length === 0 ? (
        <div className="empty-state">

          <div className="empty-logo">
            <img
              src={logo}
              className="empty-logo-img"
              alt="AminBeats"
            />
          </div>

          <h2>No favorites yet</h2>

          <p>
            Start adding songs you love
          </p>

          <button
            className="discover-btn"
            onClick={backClick}
          >
            Discover music
          </button>

        </div>
      ) : (

        /* =========================
           FAVORITES PAGE
        ========================= */

        <>
          <header className="favorites-header">

            <button
              className="back-btn"
              onClick={backClick}
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>

            <div className="favorites-title">

              <h1>
                <FaHeart className="heart-icon" />
                Favorites
              </h1>

              <p>
                Your personal music collection
              </p>

            </div>

          </header>

          <section className="favorites-list">

            {favorites.map((song, index) => (

              <div
                key={song._id}
                className={`favorite-row ${
                  activeSongId === song._id
                    ? "active"
                    : ""
                }`}
                onClick={() => handleClick(song._id)}
              >

                {/* LEFT */}

                <div className="favorite-left">

                  <span className="favorite-index">
                    {index + 1}
                  </span>

                  <img
                    src={getImage(song.coverImage)}
                    className="favorite-cover"
                    alt={song.title}
                  />

                  <div className="favorite-info">

                    <h3>
                      {song.title}
                    </h3>

                    <p>
                      {song.artist}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="favorite-actions">

                  <button
                    className="favorite-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(song._id);
                    }}
                    aria-label={
                      activeSongId === song._id &&
                      isPlaying
                        ? "Pause"
                        : "Play"
                    }
                  >
                    {activeSongId === song._id &&
                    isPlaying ? (
                      <FaPause />
                    ) : (
                      <FaPlay />
                    )}
                  </button>

                  <button
                    className="trash-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removedClick(song);
                    }}
                    aria-label="Remove from favorites"
                  >
                    <FaRegTrashAlt />
                  </button>

                </div>

              </div>

            ))}

          </section>
        </>
      )}
    </div>
  );
}