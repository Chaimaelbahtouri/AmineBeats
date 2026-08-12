import { useEffect, useState, useRef } from "react";
import {
  FaPause,
  FaPlay,
  FaVolumeUp,
  FaVolumeMute,
  FaBackward,
  FaForward,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function PlaylistPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeSongId, setActiveSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(null);

  const currentSong = songs.find(
    (song) => song._id === activeSongId
  );

  /* =========================
     FAVORITES
  ========================= */

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(saved);
  }, []);

  const toggleFavorite = (song) => {
    let update;

    const exist = favorites.find(
      (track) => track._id === song._id
    );

    if (exist) {
      update = favorites.filter(
        (track) => track._id !== song._id
      );
    } else {
      update = [...favorites, song];
    }

    setFavorites(update);
    localStorage.setItem(
      "favorites",
      JSON.stringify(update)
    );
  };

  /* =========================
     LOAD SONGS
  ========================= */

  useEffect(() => {
    api
      .get("/songs")
      .then((res) => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load songs");
        setLoading(false);
      });
  }, []);

  /* =========================
     PLAY SELECTED SONG
  ========================= */

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    audio.load();

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    setCurrentTime(0);
  }, [currentSong]);

  /* =========================
     PLAY / PAUSE
  ========================= */

  const handleClick = async (songId) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (activeSongId === songId) {
      if (audio.paused) {
        try {
          await audio.play();
        } catch {
          setIsPlaying(false);
        }
      } else {
        audio.pause();
      }

      return;
    }

    setActiveSongId(songId);
  };

  /* =========================
     AUDIO EVENTS
  ========================= */

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration || 0);
  };

  /* =========================
     SKIP
  ========================= */

  const skipBackward = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10
    );
  };

  const skipForward = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.min(
      duration,
      audioRef.current.currentTime + 10
    );
  };

  /* =========================
     PROGRESS
  ========================= */

  const handleProgressChange = (e) => {
    if (!audioRef.current) return;

    const value = Number(e.target.value);

    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  /* =========================
     VOLUME
  ========================= */

  const handleVolumeChange = (e) => {
    if (!audioRef.current) return;

    const value = Number(e.target.value);

    audioRef.current.volume = value;
    setVolume(value);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (audioRef.current.volume > 0) {
      audioRef.current.volume = 0;
      setVolume(0);
    } else {
      audioRef.current.volume = 1;
      setVolume(1);
    }
  };

  /* =========================
     FORMAT TIME
  ========================= */

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="playlist-loading">
        Loading songs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="playlist-error">
        <h2>🎧 Music not available</h2>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <div id="music" className="music-app">

      {/* SIDEBAR */}

      <aside className="sidebar">
        <h2 className="logo">AminBeats</h2>

        <nav className="menu">
          <Link to="/favorites">
            Favorites
          </Link>
        </nav>
      </aside>

      {/* MAIN */}

      <main className="main">

        <header className="topbar">
          <h1>PLAYLIST</h1>

          <p>
            AminBeats brings you handpicked playlists
            for every mood.
          </p>
        </header>

        <section className="playlist-list">

          {songs.map((song, index) => (

            <div
              key={song._id}
              className={`playlist-row ${
                activeSongId === song._id
                  ? "active"
                  : ""
              }`}
              onClick={() => handleClick(song._id)}
            >

              {/* LEFT */}

              <div className="row-left">

                <span className="index">
                  {index + 1}
                </span>

                <img
                  src={
                    song.coverImage?.startsWith("http")
                      ? song.coverImage
                      : `https://music-app-backend-self.vercel.app/images/${song.coverImage}`
                  }
                  alt={song.title}
                  className="song-img"
                />

                <div className="row-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>

              </div>

              {/* RIGHT */}

              <div className="row-right">

                <button
                  className="play-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(song._id);
                  }}
                >
                  {activeSongId === song._id &&
                  isPlaying ? (
                    <FaPause className="icon-small" />
                  ) : (
                    <FaPlay className="icon-small" />
                  )}
                </button>

                <button
                  className={`favorite-btn ${
                    favorites.find(
                      (t) => t._id === song._id
                    )
                      ? "active"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(song);
                  }}
                >
                  {favorites.find(
                    (t) => t._id === song._id
                  )
                    ? "❤️"
                    : "🤍"}
                </button>

              </div>

            </div>

          ))}

        </section>

      </main>

      {/* AUDIO PLAYER */}

      <footer className="player">

        <div className="player-info">

          {currentSong ? (
            <>
              <img
                src={currentSong.coverImage}
                alt={currentSong.title}
                className="player-cover"
              />

              <div className="player-text">
                <h4>{currentSong.title}</h4>
                <p>{currentSong.artist}</p>
              </div>
            </>
          ) : (
            <p>No song selected</p>
          )}

        </div>

        {/* REAL AUDIO ELEMENT */}

        <audio
          ref={audioRef}
          src={currentSong?.musicUrl || ""}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          preload="metadata"
        />

        {/* CUSTOM CONTROLS */}

        {currentSong && (
          <div className="custom-player-controls">

            <button
              type="button"
              onClick={skipBackward}
              title="Back 10 seconds"
            >
              <FaBackward />
              <span>10</span>
            </button>

            <button
              type="button"
              className="main-play-btn"
              onClick={() =>
                handleClick(currentSong._id)
              }
            >
              {isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>

            <button
              type="button"
              onClick={skipForward}
              title="Forward 10 seconds"
            >
              <FaForward />
              <span>10</span>
            </button>

            <span className="player-time">
              {formatTime(currentTime)}
            </span>

            <input
              className="player-progress"
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
            />

            <span className="player-time">
              {formatTime(duration)}
            </span>

            <button
              type="button"
              onClick={toggleMute}
              title="Volume"
            >
              {volume === 0 ? (
                <FaVolumeMute />
              ) : (
                <FaVolumeUp />
              )}
            </button>

            <input
              className="player-volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />

          </div>
        )}

      </footer>

    </div>
  );
}