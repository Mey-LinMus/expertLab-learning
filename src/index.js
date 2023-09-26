import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GSAP from "./components/GSAP";
import D3 from "./components/D3";
import Tone from "./components/AudioPlayer";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <GSAP /> */}
    {/* <D3 /> */}
    <Tone />
  </React.StrictMode>
);

reportWebVitals();
