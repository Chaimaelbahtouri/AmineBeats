import { FaSpotify, FaYoutube } from "react-icons/fa";

export default function AdminSongCard({ onDelete,song,onEdit}) {
      if (!song) return null;

    return (
    <div className="song-card">

    <img
        src={
          song.coverImage?.startsWith("http")
            ? song.coverImage
            : `http://localhost:5000/images/${song.coverImage}`
        }
        alt={song.title}
        className="cover"
      />

      <h3>{song.title}</h3>
      <p>{song.artist}</p>

      <div className="actions">
       
        <a href={song.youtubeUrl} target="_blank" rel="noreferrer">
          <FaYoutube /> YouTube
        </a>

        <a href={song.spotifyUrl} target="_blank" rel="noreferrer">
          <FaSpotify /> Spotify
        </a>
      </div>
      <button className="delete-btn" onClick={() => onDelete(song._id)}>
                Delete
      </button>
      <button className="edit-btn" onClick={() => onEdit(song)}>
                Edit
      </button>
    </div>
  );
}