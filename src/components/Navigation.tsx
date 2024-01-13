import React, { useEffect, useState } from "react";
import "../styles/Navigation.css";
import { Menu, Minimize, Home, BookOpen, Search } from "react-feather";
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
      </svg>
      <a href="/">
        <img
          height={"2em"}
          className="nav-logo"
          src="images/sanzio_wavy.webp"
          alt="Sanzio 30"
        />
      </a>
      {isOpen && (
        <ul className="nav-links">
          <li>
            <Home
              onClick={() => setPageContent(<HomePage />)}
              className="nav-icon"
            />
          </li>
          <li>
            <BookOpen
              onClick={() => setPageContent(<EventInfo />)}
              className="nav-icon"
            />
          </li>
          <li>
            <Search
              onClick={() =>
                handleLinkClick(<CodeForm setMapContent={handleLinkClick} />)
              }
              className="nav-icon"
            />
          </li>
        </ul>
      )}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <Minimize /> : <Menu />}
      </button>
    </nav>
  );
};

export default Navigation;
