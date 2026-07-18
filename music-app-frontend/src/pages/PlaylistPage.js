import { useEffect, useState, } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function PlaylistPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSongId, setActiveSongId]= useState(null)
  const [isPlaying, setIsPlaying]= useState(false)
  const [favorites, setFavorites] = useState([]);
  useEffect(()=> {
    const saved = JSON.parse(localStorage.getItem("favorites"))|| [];
    setFavorites(saved)
  },[])
  const toggleFavorite = (song)=> {
    let update
    const exist = favorites.find((track)=> track._id === song._id)
    if (exist) {
      update = favorites.filter((track) => track._id !== song._id)
    }else{
      update=[...favorites,song]
    }
    setFavorites(update);
    localStorage.setItem("favorites",JSON.stringify(update))
  }

  const handleClick = (songId)=> {
    if (activeSongId === songId ) {
      setIsPlaying(!isPlaying)
    } else {
      setActiveSongId(songId)
      setIsPlaying(true)

    }
}

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
            <Link to="/favorites">Favorites</Link>
          </nav>
        </aside>
    
        {/* MAIN */}
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
    
                {/* LEFT */}
                <div className="row-left">
    
                  <span className="index">{index + 1}</span>
    
                  <img
                    src={
                      song.coverImage?.startsWith("http")
                        ? song.coverImage
                        : `http://localhost:5000/images/${song.coverImage}`
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
                    {activeSongId === song._id && isPlaying ?(
                        <FaPause className="icon-small"/> 
                      ):(
                          <FaPlay className="icon-small"/>
                      )}

                  </button>
    
                  <button
                    className={`favorite-btn ${
                      favorites.find((t) => t._id === song._id)
                        ? "active"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(song);
                    }}
                  >
                    {favorites.find((t) => t._id === song._id)
                      ? "❤️"
                      : "🤍"}
                  </button>
    
                </div>
    
              </div>
            ))}
    
          </section>
    
        </main>
    
        {/* FOOTER */}
        <footer className="player">
          <div className="player-info">Now Playing</div>
    
          <div className="controls">
            <button>⏮</button>
            <button>▶</button>
            <button>⏭</button>
          </div>
        </footer>
    
      </div>
    
  );
}