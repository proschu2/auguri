import React from "react";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <img
        className="glassenz"
        src="images/glassenz.webp"
        alt="Sanzio 30"
        loading="lazy"
      />
    </div>
  );
};

export default HomePage;
