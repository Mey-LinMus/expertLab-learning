import React, { useEffect, useRef } from "react";
import "../style/Project.css";
import * as Tone from "tone";
import gsap from "gsap";

const Project = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const ball = ballRef.current;

    const animations = {
      A: { x: -100, y: 0, scale: 2 },
      Z: { x: 100, y: 0, scale: 1 },
      E: { x: 0, y: -100, scale: 1 },
      R: { x: 0, y: 100, scale: 1 },
      T: { x: 0, y: 200, scale: 5 },
      Y: { x: 0, y: 300, scale: 1 },
      U: { x: 0, y: 400, scale: 0.5 },
    };
    const defaultAnimation = { x: 0, y: 0, scale: 0.5 };
    // Define the note frequencies for each key
    const noteFrequencies = {
      A: "C4",
      Z: "D4",
      E: "E4",
      R: "F4",
      T: "G4",
      Y: "A4",
      U: "B8",
    };
    // Function to play the animation based on the key
    const playAnimation = (key) => {
      const animation = animations[key] || defaultAnimation;
      gsap.to(ball, {
        x: animation.x,
        y: animation.y,
        scale: animation.scale,
        duration: 0.5,
        ease: "power2.inOut",
      });
    };
    const playNote = (key, keyElement) => {
      const note = noteFrequencies[key];
      if (note) {
        synth.triggerAttackRelease(note, "4n");
        gsap.to(keyElement, {
          duration: 0.2,
          scaleY: 0.8,
          yoyo: true,
          repeat: 1,
        });
        // Dispatch a custom event with the key as detail
        const event = new CustomEvent("keyClick", {
          detail: { key: keyElement.id },
        });
        document.dispatchEvent(event);
      }
    };
    const keys = ["A", "Z", "E", "R", "T", "Y","U"];
    // Listen for keydown events on the document
    document.addEventListener("keydown", (event) => {
      const key = event.key.toUpperCase(); // Convert the pressed key to uppercase
      if (keys.includes(key)) {
        const keyElement = document.getElementById(key);
        playNote(key, keyElement);
        playAnimation(key);
      }
    });
    return () => {
      synth.dispose();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className="piano">
          <div className="white-key" id="A"></div>
          <div className="white-key" id="Z"></div>
          <div className="white-key" id="E"></div>
          <div className="white-key" id="R"></div>
          <div className="white-key" id="T"></div>
          <div className="white-key" id="Y"></div>
          <div className="white-key" id="U"></div>
        </div>
        <p>
          Use the AZERTY keys on your keyboard to play music
          <br />
          and to move the ball
        </p>
        <div className="ball" ref={ballRef}></div>
      </header>
    </div>
  );
};
export default Project;
