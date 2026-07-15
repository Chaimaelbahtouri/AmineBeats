import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import {
  FaHeart,
  FaPause,
  FaPlay,
  FaRegTrashAlt,
  FaArrowLeft
} from "react-icons/fa";

export default function FavoritesPage() {

  const nav = useNavigate();

  const backClick = () => {
    nav("/PlaylistPage");
  };

  const [favorites, setFavorites] = useState([]);
  const [activeSongId, setActiveSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);


  const handleClick = (songId) => {

    if (activeSongId === songId) {
      setIsPlaying(!isPlaying);
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


      {favorites.length === 0 ? (

        <div className="empty-state">

          <div className="empty-logo">

            <img
              src={logo}
              className="row-cover"
              alt="logo"
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

        <>


          <header className="favorites-header">


            <button
              className="back-btn"
              onClick={backClick}
            >

              <FaArrowLeft />

            </button>



            <div>

              <h1>

                <FaHeart className="heart-icon" />

                Favorites

              </h1>


              <p>
                Your personal music collection
              </p>


            </div>


          </header>



          <section className="playlist-list">


            {favorites.map((song, index) => (

              <div

                key={song._id}

                className={
                  `playlist-row ${
                    activeSongId === song._id
                      ? "active"
                      : ""
                  }`
                }

                onClick={() => handleClick(song._id)}

              >


                <div className="row-left">


                  <span className="index">

                    {index + 1}

                  </span>



                  <img

                    src={getImage(song.coverImage)}

                    className="row-cover"

                    alt={song.title}

                  />



                  <div className="row-info">


                    <h3>
                      {song.title}
                    </h3>


                    <p>
                      {song.artist}
                    </p>


                  </div>


                </div>



                <div className="row-right">


                  <button

                    className="play-btn"

                    onClick={(e) => {

                      e.stopPropagation();

                      handleClick(song._id);

                    }}

                  >

                    {
                      activeSongId === song._id && isPlaying
                        ? <FaPause />
                        : <FaPlay />
                    }


                  </button>




                  <button

                    className="trash-btn"

                    onClick={(e) => {

                      e.stopPropagation();

                      removedClick(song);

                    }}

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