import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const links = [
    {name:"Home", path:"/"},
    {name:"Playlist", path:"/playlistPage"},
    {name:"Search", path:"/search"}
  ];

  return (
    <header className="navbar">

      <Link to="/" className="logo">
        <img 
          src={logo}
          alt="logo"
          className="logo-img"
        />
      </Link>


      {/* Desktop menu */}
      <nav className="desktop-nav">
        {links.map((link)=>(
          <Link 
            key={link.path}
            to={link.path}
            className="nav-item"
          >
            {link.name}
          </Link>
        ))}
      </nav>



      {/* Mobile button */}
      <button
        className="menu-btn"
        onClick={()=>setOpen(!open)}
        aria-label="menu"
      >
        {open ? <FaTimes/> : <FaBars/>}
      </button>



      {/* Mobile menu */}
      {open && (
        <nav className="mobile-menu">

          {links.map((link)=>(
            <Link
              key={link.path}
              to={link.path}
              className="nav-item"
              onClick={()=>setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

        </nav>
      )}

    </header>
  );
}