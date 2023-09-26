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
      A: { x: -100, y: 0, scale: 1 },
      Z: { x: 100, y: 0, scale: 1 },
      E: { x: 0, y: -100, scale: 1 },
      R: { x: 0, y: 100, scale: 1 },
      T: { x: 0, y: 200, scale: 1 },
      Y: { x: 0, y: 300, scale: 1 },
    };

    const defaultAnimation = { x: 0, y: 0, scale: 0.5 };

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

    const playNote = (note, keyElement) => {
      synth.triggerAttackRelease(note, "8n");
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
    };

    const keys = ["A", "Z", "E", "R", "T", "Y"];

    keys.forEach((key) => {
      const keyElement = document.getElementById(key);
      keyElement.addEventListener("click", () => {
        playNote("C4", keyElement);
        playAnimation(key);
      });
    });

    return () => {
      synth.dispose();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Piano App</h1>
        <div className="piano">
          <div className="white-key" id="A"></div>
          <div className="white-key" id="Z"></div>
          <div className="white-key" id="E"></div>
          <div className="white-key" id="R"></div>
          <div className="white-key" id="T"></div>
          <div className="white-key" id="Y"></div>
        </div>
        <div className="ball" ref={ballRef}></div>
      </header>
    </div>
  );
};

export default Project;
