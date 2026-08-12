import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaBackward, FaForward, FaVolumeUp } from "react-icons/fa";
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

  const currentSong = songs.find((song) => song._id === activeSongId);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    api.get("/songs")
      .then((res) => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load songs");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.load();

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playAudio();
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleFavorite = (song) => {
    let updated;

    const exists = favorites.find((track) => track._id === song._id);

    if (exists) {
      updated = favorites.filter((track) => track._id !== song._id);
    } else {
      updated = [...favorites, song];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleClick = (songId) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeSongId === songId) {
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        audio.pause();
        setIsPlaying(false);
      }
      return;
    }

    setActiveSongId(songId);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(
      0,
      Math.min(audio.duration || 0, audio.currentTime + seconds)
    );
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const value = Number(e.target.value);

    if (!audio) return;

    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return <div className="playlist-loading">Loading songs...</div>;
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
      <aside className="sidebar">
        <h2 className="logo">AminBeats</h2>

        <nav className="menu">
          <Link to="/favorites">Favorites</Link>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>PLAYLIST</h1>
          <p>AminBeats brings you handpicked playlists for every mood.</p>
        </header>

        <section className="playlist-list">
          {songs.map((song, index) => (
            <div
              key={song._id}
              className={`playlist-row ${
                activeSongId === song._id ? "active" : ""
              }`}
              onClick={() => handleClick(song._id)}
            >
              <div className="row-left">
                <span className="index">{index + 1}</span>

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

              <div className="row-right">
                <button
                  className="play-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(song._id);
                  }}
                  aria-label={activeSongId === song._id && isPlaying ? "Pause" : "Play"}
                >
                  {activeSongId === song._id && isPlaying ? (
                    <FaPause className="icon-small" />
                  ) : (
                    <FaPlay className="icon-small" />
                  )}
                </button>

                <button
                  className={`favorite-btn ${
                    favorites.find((t) => t._id === song._id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(song);
                  }}
                  aria-label="Favorite"
                >
                  {favorites.find((t) => t._id === song._id) ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="player">
        <div className="player-info">
          {currentSong ? (
            <>
              <img
                src={
                  currentSong.coverImage?.startsWith("http")
                    ? currentSong.coverImage
                    : `https://music-app-backend-self.vercel.app/images/${currentSong.coverImage}`
                }
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

        <div className="custom-player-controls">
          <button
            className="skip-btn"
            onClick={() => skip(-10)}
            disabled={!currentSong}
            aria-label="Back 10 seconds"
          >
            <FaBackward />
            <span>10</span>
          </button>

          <button
            className="main-play-btn"
            onClick={togglePlay}
            disabled={!currentSong}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            className="skip-btn"
            onClick={() => skip(10)}
            disabled={!currentSong}
            aria-label="Forward 10 seconds"
          >
            <FaForward />
            <span>10</span>
          </button>

          <span className="player-time">{formatTime(currentTime)}</span>

          <input
            className="player-progress"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={handleProgressChange}
            disabled={!currentSong || !duration}
            aria-label="Song progress"
          />

          <span className="player-time">{formatTime(duration)}</span>

          <div className="volume-control">
            <FaVolumeUp />
            <input
              className="player-volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              disabled={!currentSong}
              aria-label="Volume"
            />
          </div>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          preload="metadata"
        >
          {currentSong && (
            <source src={currentSong.musicUrl} type="audio/mpeg" />
          )}
        </audio>
      </footer>
    </div>
  );
}
