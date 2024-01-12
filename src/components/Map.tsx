import { maptiler, osm } from "pigeon-maps/providers";
import { Map as PigeonMap, Overlay } from "pigeon-maps";
import useWindowDimensions from "../hooks/useWindowDimensions";
import React, { useState } from "react";
import { location } from "../assets/data/location";
import { RefreshCw, Plus, Minus } from "react-feather";
import "../styles/Map.css";

const INITIAL_ZOOM = 16;
const WIDTH_LIMIT = 600;

const Map: React.FC<{ loc: location }> = ({ loc }) => {
  const provider =
    import.meta.env.VITE_MAPTILER_API_KEY &&
    import.meta.env.VITE_GRAY === "true"
      ? maptiler(import.meta.env.VITE_MAPTILER_API_KEY, "basic-v2-light")
      : osm;

  console.log("provider", provider);
  let { height, width } = useWindowDimensions();
  if (width > WIDTH_LIMIT) {
    height = 0.4 * height;
    width = Math.min(WIDTH_LIMIT, 0.8 * width);
  }
  const center: [number, number] = [loc.lat, loc.lon];

  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);

  return (
    <div>
      <PigeonMap
        provider={provider}
        attribution={false}
        height={height}
        width={width}
        center={center}
        zoom={zoom}
        minZoom={15}
        maxZoom={18}
        onBoundsChanged={({ center, zoom, initial }) => {
          console.log(center, zoom, initial);
          setZoom(zoom);
        }}
      >
        <div className="zoom-reset-controls">
          <button
            onClick={() => setZoom((prevZoom) => Math.min(prevZoom + 1, 18))}
          >
            <Plus />
          </button>
          <button
            onClick={() => setZoom((prevZoom) => Math.max(prevZoom - 1, 15))}
          >
            <Minus />
          </button>
          <button onClick={() => setZoom(INITIAL_ZOOM)}>
            <RefreshCw />
          </button>
        </div>
        <Overlay anchor={center} offset={[37.5, 37.5]}>
          <img
            src="images/sanzio_wavy.webp"
            height={75}
            width={75}
            alt="Sanzio 30"
          />
        </Overlay>
      </PigeonMap>
    </div>
  );
};

export default Map;
