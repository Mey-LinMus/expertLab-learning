import React, { useEffect, useRef } from "react";
import "../style/Project.css";
import * as Tone from "tone";
import gsap from "gsap";

const Project = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const ball = ballRef.current;

    // GSAP animations
    const animations = {
      A: { x: -100, y: 0, scale: 2 },
      Z: { x: 100, y: 0, scale: 1 },
      E: { x: 0, y: -100, scale: 1 },
      R: { x: 0, y: 100, scale: 1 },
      T: { x: 0, y: 200, scale: 5 },
      Y: { x: 0, y: 300, scale: 1 },
      U: { x: 0, y: 400, scale: 0.5 },
      I: { x: 200, y: 100, scale: 3 },
      O: { x: 300, y: 200, scale: 8 },
      P: { x: 10, y: 50, scale: 0.2 },
      Q: { x: -200, y: -100, scale: 1.5 },
      S: { x: 200, y: -100, scale: 2 },
      D: { x: -100, y: 400, scale: 3 },
      F: { x: 150, y: -200, scale: 2 }, // New key F
      G: { x: 50, y: -300, scale: 3 }, // New key G
      H: { x: 300, y: -300, scale: 2.5 }, // New key H
      J: { x: -300, y: 250, scale: 3.5 }, // New key J
      K: { x: -250, y: -250, scale: 2.5 }, // New key K
      L: { x: 250, y: 250, scale: 3.5 }, // New key L
      M: { x: -250, y: 250, scale: 3 }, // New key M
      W: { x: -200, y: 200, scale: 3 }, // New key W
      X: { x: 200, y: -200, scale: 2.5 }, // New key X
      C: { x: 300, y: 300, scale: 3 }, // New key C
      V: { x: -300, y: -300, scale: 2 }, // New key V
      B: { x: 300, y: -300, scale: 2 }, // New key B
      N: { x: -300, y: 300, scale: 2.5 }, // New key N
    };
    const defaultAnimation = { x: 0, y: 0, scale: 0.5 };
    // Note frequencies
    const noteFrequencies = {
      A: "C4",
      Z: "D4",
      E: "E4",
      R: "F4",
      T: "G4",
      Y: "A4",
      U: "B3",
      I: "C4",
      O: "D4",
      P: "E4",
      Q: "F3",
      S: "G3",
      D: "A3",
      F: "B3",
      G: "C4",
      H: "D4",
      J: "E4",
      K: "F4",
      L: "G4",
      M: "A4",
      W: "B4",
      X: "C5",
      C: "D5",
      V: "E5",
      B: "F5",
      N: "G5",
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
    const keys = [
      "A",
      "Z",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "Q",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "W",
      "X",
      "C",
      "V",
      "B",
      "N",
    ];

    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (keys.includes(key)) {
        const keyElement = document.getElementById(key);
        playNote(key, keyElement);
        playAnimation(key);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
          <div className="white-key" id="I"></div>
          <div className="white-key" id="O"></div>
          <div className="white-key" id="P"></div>
          <div className="white-key" id="Q"></div>
          <div className="white-key" id="S"></div>
          <div className="white-key" id="D"></div>
          <div className="white-key" id="F"></div>
          <div className="white-key" id="G"></div>
          <div className="white-key" id="H"></div>
          <div className="white-key" id="J"></div>
          <div className="white-key" id="K"></div>
          <div className="white-key" id="L"></div>
          <div className="white-key" id="M"></div>
          <div className="white-key" id="W"></div>
          <div className="white-key" id="X"></div>
          <div className="white-key" id="C"></div>
          <div className="white-key" id="V"></div>
          <div className="white-key" id="B"></div>
          <div className="white-key" id="N"></div>
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
