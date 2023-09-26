import React, { useEffect } from "react";
import "../style/Project.css";
import * as Tone from "tone";
import gsap from "gsap";

const Piano = () => {
  useEffect(() => {
    const synth = new Tone.Synth().toDestination();

    const playNote = (note, keyElement) => {
      synth.triggerAttackRelease(note, "8n");
      gsap.to(keyElement, {
        duration: 0.2,
        scaleY: 0.8,
        yoyo: true,
        repeat: 1,
      });
    };

    const keys = {
      A: "C4",
      Z: "D4",
      E: "E4",
      R: "F4",
    };

    const handleClick = (key) => {
      const note = keys[key];
      const keyElement = document.getElementById(key);
      playNote(note, keyElement);
    };

    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (keys[key]) {
        const note = keys[key];
        const keyElement = document.getElementById(key);
        playNote(note, keyElement);
      }
    };

    // Add click event listeners to piano keys
    Object.keys(keys).forEach((key) => {
      const keyElement = document.getElementById(key);
      keyElement.addEventListener("click", () => handleClick(key));
    });

    // Add keyboard event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      synth.dispose();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="piano">
      <div className="white-key" id="A"></div>
      <div className="white-key" id="Z"></div>
      <div className="white-key" id="E"></div>
      <div className="white-key" id="R"></div>
    </div>
  );
};

const Project = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Piano App</h1>
        <Piano />
      </header>
    </div>
  );
};

export default Project;

