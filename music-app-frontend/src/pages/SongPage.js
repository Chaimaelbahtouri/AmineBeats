import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import api from "../api/axios";

export default function SongPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/songs/${id}`)
      .then((res) => {
        setSong(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="songpage-loading">Loading...</h2>;
  if (!song) return <h2 className="songpage-error">Song not found</h2>;

  return (
    <div className="songpage">

      <div className="songpage-card">

        <img
            src={
                song.coverImage?.startsWith("http")
                ? song.coverImage
                : `http://localhost:5000/images/${song.coverImage}`
             }
          alt={song.title}
          className="songpage-cover"
        />

        <div className="songpage-details">

          <h1 className="songpage-title">{song.title}</h1>
          <p className="songpage-artist">{song.artist}</p>

          <div className="songpage-links">

            <a
              href={song.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="songpage-link youtube"
            >
              <FaYoutube /> YouTube
            </a>

            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="songpage-link spotify"
            >
              <FaSpotify /> Spotify
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}