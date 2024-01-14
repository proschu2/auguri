import { maptiler, osm } from "pigeon-maps/providers";
import { Map as PigeonMap, Overlay } from "pigeon-maps";
import useWindowDimensions from "../hooks/useWindowDimensions";
import React, { useState } from "react";
import { location } from "../assets/data/location";
import {
  AiOutlinePlus as Plus,
  AiOutlineMinus as Minus,
  AiOutlineReload as Refresh,
} from "react-icons/ai";
import "../styles/Map.css";

const INITIAL_ZOOM = 16;
const WIDTH_LIMIT = 768;

const Map: React.FC<{ loc: location }> = ({ loc }) => {
  const provider =
    import.meta.env.VITE_MAPTILER_API_KEY &&
    import.meta.env.VITE_GRAY === "true"
      ? maptiler(import.meta.env.VITE_MAPTILER_API_KEY, "basic-v2-light")
      : osm;

  let { height, width } = useWindowDimensions();
  if (width > WIDTH_LIMIT) {
    height = 0.8 * height;
    width = Math.min(WIDTH_LIMIT, 0.8 * width);
  }
  const [refreshKey, setRefreshKey] = useState(0);
  const INITIAL_CENTER: [number, number] = [loc.lat, loc.lon];

  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);

  return (
    <div style={{ height: `calc(var(--vh, 1vh) * 100)` }}>
      <PigeonMap
        key={refreshKey}
        provider={provider}
        attribution={false}
        width={width}
        center={INITIAL_CENTER}
        zoom={zoom}
        minZoom={15}
        maxZoom={18}
        onBoundsChanged={({ zoom }) => {
          setZoom(zoom);
        }}
        boxClassname="pigeon-box"
      >
        <div className="zoom-reset-controls">
          <button
            id="zoom-in"
            onClick={() => setZoom((prevZoom) => Math.min(prevZoom + 1, 18))}
          >
            <Plus />
          </button>
          <button
            id="zoom-out"
            onClick={() => setZoom((prevZoom) => Math.max(prevZoom - 1, 15))}
          >
            <Minus />
          </button>
          <button
            id="refresh"
            onClick={() => {
              setZoom(INITIAL_ZOOM);
              setRefreshKey((oldKey) => oldKey + 1);
            }}
          >
            <Refresh />
          </button>
        </div>
        <Overlay anchor={INITIAL_CENTER} offset={[37.5, 37.5]}>
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
