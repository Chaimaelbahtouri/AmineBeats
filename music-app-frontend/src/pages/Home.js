import { useEffect, useState } from "react";
import api from "../api/axios";
import SocialSection from "../components/SocialSection";
import SongCard from "../components/SongCard";
import Hero from "./Hero";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trending, setTrending] = useState([]);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    console.log("API KEY:", API_KEY);
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
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC8L6h-8x3pT5wd106u2QpWQ&type=video&order=date&maxResults=8&key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      setTrending(data.items || []);
    })
    .catch((err) => console.log(err));
}, [API_KEY]);

  const featured = trending.length ? trending : songs.slice(0, 8);

  if (loading) {
    return (
      <div className="state-container">
        <h2>🎧 Loading songs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container">
        <h2>🎧 Music not available</h2>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <>
      {/* 1. HERO (branding first) */}
      <Hero />

      {/* 2. FEATURED MUSIC (most important content) */}
      <section id="music" className="songs-section">
        <h2>Featured Songs</h2>

        {featured.length === 0 ? (
          <p>No songs found</p>
        ) : (
          <div className="songs-grid">
            {featured
            .filter(video => video?.snippet)
            .map((video) => (
              <SongCard
                key={video.id.videoId}
              title={video.snippet?.title || "Untitled"}
              artist={video.snippet?.channelTitle || "Unknown"}
              youtubeUrl={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              coverImage={
                video.snippet?.thumbnails?.medium?.url ||
                video.snippet?.thumbnails?.default?.url
              }
              />
            ))}
          </div>
        )}
      </section>
      {/* 3. ABOUT ARTIST (story / identity) */}
      

      {/* 4. SOCIAL (last section = external links) */}
      <SocialSection />
    </>
  );
}