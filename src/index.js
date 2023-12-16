import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GSAP from "./components/GSAP";
import AudioPlayer from "./components/AudioPlayer";
import Project from "./components/Project";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <GSAP /> */}
    {/* <D3 /> */}
    {/* <AudioPlayer /> */}
    <Project/>
  </React.StrictMode>
);

reportWebVitals();
