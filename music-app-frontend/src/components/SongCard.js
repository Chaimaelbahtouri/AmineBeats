import {  FaSpotify, FaYoutube } from "react-icons/fa";

export default function SongCard({ title, artist, youtubeUrl, spotifyUrl,coverImage }) {
  return (
    <div className="song-card">

    <img
        src={
          coverImage?.startsWith("http")
            ? coverImage
            : `http://localhost:5000/images/${coverImage}`
        }
        alt={title}
        className="cover"
      />

      <h3>{title}</h3>
      <p>{artist}</p>

      <div className="actions">
       
        <a href={youtubeUrl} target="_blank" rel="noreferrer">
          <FaYoutube /> YouTube
        </a>

        <a href={spotifyUrl} target="_blank" rel="noreferrer">
          <FaSpotify /> Spotify
        </a>
      </div>
    </div>
  );
}