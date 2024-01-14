import React from "react";
import "../styles/EventInfo.css";
import data from "../assets/data/info.json";
import { info } from "../assets/data/info"; // Import the 'info' type from the correct location

const EventInfo: React.FC = () => {
  return (
    <div style={{ textAlign: "left", margin: "20px" }}>
      <h2 className="event-title">info</h2>
      <div className="event-info-container">
        {data &&
          data.map((i: info) => (
            <>
              <div className="event-label">{i.label}</div>
              <div
                className="event-info"
                dangerouslySetInnerHTML={{ __html: i.value }}
              ></div>
            </>
          ))}
      </div>
      <div className="event-meteo">*dipende dalla meteo</div>
    </div>
  );
};

export default EventInfo;
