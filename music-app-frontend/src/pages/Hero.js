import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const scrollToMusic = () => {
    document.getElementById("music")?.scrollIntoView({
      behavior: "smooth",
    });
    
  };
  const goToPlaylist = ()=> {
    navigate("/PlaylistPage")
  }


  return (
    <section className="hero">
      <div className="hero-content">
        <h2>AmineBeats 🎵</h2>

        <p>
          Discover and stream your favorite beats anytime, anywhere.
        </p>

        <div className="hero-buttons">

          <button className="btn-primary" onClick={scrollToMusic}>
            Start Listening
          </button>

          <button className="btn-secondary" onClick={goToPlaylist}>
            Explore Music
          </button>

        </div>
      </div>
    </section>
  );
}