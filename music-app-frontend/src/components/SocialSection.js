import {
    FaInstagram,
    FaYoutube,
    FaSpotify,
    FaFacebook,
    FaTiktok,
  } from "react-icons/fa";
  
  export default function SocialSection() {
    return (
      <section className="social-section">
  
        <div className="social-header">
          <h2>Connect With AmineBeats</h2>
  
          <p>
            Follow us everywhere and never miss a new beat 🔥
          </p>
        </div>
  
        <div className="social-grid">
  
        <a href="https://www.instagram.com/aminebeats1/"className="social-card instagram">
          <FaInstagram />
          <span>Instagram</span>
        </a>
  
          <a href="https://www.youtube.com/@beatsamine?fbclid=IwY2xjawRy0lxleHRuA2FlbQIxMABicmlkETFaY3poaWFZVWNBTjBqbDQxc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHsxjlN04qLfl8DMWdwYapQXjusRpQrwv4Nv3Ubq6hbhAux7qryO3Oyr65tad_aem_PTFsIo6HtmsNDaocpEfv1A" className="social-card youtube">
            <FaYoutube />
            <span>YouTube</span>
          </a>
  
          <a href="https://open.spotify.com/artist/1DG95Z70gLku1SVWaKlAPF?si=74aEwthdR1yZ6RysIfm7oQ" className="social-card spotify">
            <FaSpotify />
            <span>Spotify</span>
          </a>
  
          <a href="https://www.facebook.com/Aminebeats1" className="social-card facebook">
            <FaFacebook />
            <span>Facebook</span>
          </a>
  
          <a href="https://www.tiktok.com/@Aminebeats1?fbclid=IwY2xjawRy0nZleHRuA2FlbQIxMABicmlkETFaY3poaWFZVWNBTjBqbDQxc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHjEWttEcCTWN6sU4atXENUfrB_X5szQoE8n0_wwJkhvXtPPZ-r6wfRU0qT9n_aem_-CBeoX8knIXjvJugk3oFJg" className="social-card tiktok">
            <FaTiktok />
            <span>TikTok</span>
          </a>
  
        </div>
      </section>
    );
  }