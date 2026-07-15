import { useState, useEffect } from "react";
import api from "../api/axios";
import AdminSongCard from "../components/AdminSongCard";

export default function Songs() {

  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null); // الأغنية اللي بغيتي تعدل
  const [form, setInfo] = useState({
    title: "",
    artist: "",
    youtubeUrl: "",
    spotifyUrl: "",
    coverImage: "",
  });

  useEffect(() => {
    api.get("/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.log("Error fetching songs:", err));
  }, []);

  // ADD أو EDIT حسب selectedSong
  const handleSubmit = async (e) => {
    e.preventDefault();

    // إلا selectedSong فيه أغنية → Edit
    if (selectedSong) {
      try {
        const res = await api.put(`/songs/${selectedSong._id}`, form);
        const updatedSong = res.data;

        // بدل الأغنية القديمة بالجديدة فاللائحة
        setSongs((prev) =>
          prev.map((song) =>
            song._id === selectedSong._id ? updatedSong : song
          )
        );

        // ارجع لوضعية Add
        setSelectedSong(null);
        setInfo({ title: "", artist: "", youtubeUrl: "", spotifyUrl: "", coverImage: "" });

      } catch (err) {
        console.log("Error updating song:", err);
      }

    // إلا selectedSong = null → Add
    } else {
      try {
        const res = await api.post("/songs", form);
        const newSong = res.data;
        setSongs((prev) => [...prev, newSong]);
        setInfo({ title: "", artist: "", youtubeUrl: "", spotifyUrl: "", coverImage: "" });

      } catch (err) {
        console.log("Error adding song:", err.response?.data);
      }
    }
  };

  // DELETE
  const onDelete = async (id) => {
    try {
      await api.delete(`/songs/${id}`);
      setSongs((prev) => prev.filter((song) => song._id !== id));
    } catch (err) {
      console.log("Error deleting song:", err);
    }
  };

  // EDIT: املا الفورم بمعلومات الأغنية
  const onEdit = (song) => {
    setSelectedSong(song);
    setInfo({
      title: song.title,
      artist: song.artist,
      youtubeUrl: song.youtubeUrl,
      spotifyUrl: song.spotifyUrl,
      coverImage: song.coverImage,
    });
  };

  return (
    <div className="songs-page">

      {/* الفورم: Add أو Edit حسب selectedSong */}
      <h2 className="songs-title">
        {selectedSong ? "Edit Song" : "Add Song"}
      </h2>

      <form className="songs-form" onSubmit={handleSubmit}>
        <input className="songs-input" type="text" placeholder="Song title"
          value={form.title} onChange={(e) => setInfo({ ...form, title: e.target.value })} />
        <input className="songs-input" type="text" placeholder="Song artist"
          value={form.artist} onChange={(e) => setInfo({ ...form, artist: e.target.value })} />
        <input className="songs-input" type="url" placeholder="YouTube URL"
          value={form.youtubeUrl} onChange={(e) => setInfo({ ...form, youtubeUrl: e.target.value })} />
        <input className="songs-input" type="url" placeholder="Spotify URL"
          value={form.spotifyUrl} onChange={(e) => setInfo({ ...form, spotifyUrl: e.target.value })} />
        <input className="songs-input" type="url" placeholder="Cover Image URL"
          value={form.coverImage} onChange={(e) => setInfo({ ...form, coverImage: e.target.value })} />

        <button className="songs-btn" type="submit">
          {selectedSong ? "Update Song" : "Add Song"}
        </button>

        {/* زر Cancel إلا كنتي فوضعية Edit */}
        {selectedSong && (
          <button className="songs-btn" type="button" onClick={() => {
            setSelectedSong(null);
            setInfo({ title: "", artist: "", youtubeUrl: "", spotifyUrl: "", coverImage: "" });
          }}>
            Cancel
          </button>
        )}
      </form>

      <h3 className="songs-section-title">All Songs</h3>
      <div className="songs-grid">
        {songs.map((song) => (
          <AdminSongCard
            key={song._id}
            song={song}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

    </div>
  );
}