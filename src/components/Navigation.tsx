import React, { useEffect, useState } from "react";
import "../styles/Navigation.css";
import {
  AiFillInfoCircle as Info,
  AiFillLock as Lock,
  AiFillHome as Home,
  AiOutlineMenu as Menu,
  AiOutlineClose as Minimize,
} from "react-icons/ai";
import CodeForm from "./CodeForm";
import useWindowDimensions from "../hooks/useWindowDimensions";
import EventInfo from "./EventInfo";
import HomePage from "./HomePage";

interface NavigationProps {
  setModalContent: (content: React.ReactNode) => void;
  setPageContent: (content: React.ReactNode) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  setModalContent,
  setPageContent,
}) => {
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(width >= 768);

  const handleLinkClick = (content: React.ReactNode) => {
    setModalContent(content);
  };

  useEffect(() => {
    setIsOpen(width >= 768);
  }, [width]);

  return (
    <nav className={`nav ${isOpen ? "open" : ""}`}>
      <svg width="0" height="0">
        <linearGradient id="rainbow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop stopColor="#007ccc" offset="0%" />
          <stop stopColor="#25badc" offset="14%" />
          <stop stopColor="#74d2d9" offset="28%" />
          <stop stopColor="#ade1b9" offset="42%" />
          <stop stopColor="#74d2d9" offset="56%" />
          <stop stopColor="#e5e47a" offset="70%" />
          <stop stopColor="#f8cd83" offset="84%" />
          <stop stopColor="#ff86dd" offset="100%" />
        </linearGradient>
        <linearGradient id="rainbow1">
          <stop stopColor="#007ccc" offset="0%" />
          <stop stopColor="#25badc" offset="33%" />
          <stop stopColor="#74d2d9" offset="66%" />
          <stop stopColor="#ade1b9" offset="100%" />
        </linearGradient>
        <linearGradient id="rainbow2">
          <stop stopColor="#74d2d9" offset="0%" />
          <stop stopColor="#ade1b9" offset="33%" />
          <stop stopColor="#74d2d9" offset="66%" />
          <stop stopColor="#e5e47a" offset="100%" />
        </linearGradient>
        <linearGradient id="rainbow3">
          <stop stopColor="#74d2d9" offset="0%" />
          <stop stopColor="#e5e47a" offset="33%" />
          <stop stopColor="#f8cd83" offset="66%" />
          <stop stopColor="#ff86dd" offset="100%" />
        </linearGradient>
      </svg>
      <a href="/">
        <img
          height={"2em"}
          className="nav-logo"
          src="images/sanzio_wavy.webp"
          alt="Sanzio 30"
          loading="lazy"
        />
      </a>
      {isOpen && (
        <ul className="nav-links">
          <li>
            <Home
              onClick={() => setPageContent(<HomePage />)}
              className="nav-icon rainbow1"
            />
          </li>
          <li>
            <Info
              onClick={() => handleLinkClick(<EventInfo />)}
              className="nav-icon rainbow2"
            />
          </li>
          <li>
            <Lock
              onClick={() =>
                handleLinkClick(<CodeForm setMapContent={handleLinkClick} />)
              }
              className="nav-icon rainbow3"
            />
          </li>
        </ul>
      )}
      <button
        className="hamburger"
        name="menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Minimize /> : <Menu />}
      </button>
    </nav>
  );
};

export default Navigation;
