import React, { useEffect, useState } from "react";
import "../styles/Navigation.css";
import { Menu, Minimize } from "react-feather";
import DigitForm from "./DigitForm";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface NavigationProps {
  setModalContent: (content: React.ReactNode) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setModalContent }) => {
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
      <a href="/">
        <img
          className="nav-logo"
          src="images/sanzio_wavy.webp"
          alt="Sanzio 30"
        />
      </a>
      {isOpen && (
        <ul className={`nav-links`}>
          <li>
            <a onClick={() => handleLinkClick(<DigitForm />)}>Digit</a>
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
