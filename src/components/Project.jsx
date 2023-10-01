import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import gsap from "gsap";
import "../style/Project.css"; // Make sure the CSS path is correct

const Project = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const ball = ballRef.current;

    // Random animations for each key
    const randomAnimation = () => {
      return {
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        scale: Math.random() * 3 + 1,
      };
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

    // Function to play the animation and note for a key
    const playKey = (key) => {
      const animation = randomAnimation();
      const keyElement = document.getElementById(key);
      if (keyElement) {
        gsap.to(ball, {
          x: animation.x,
          y: animation.y,
          scale: animation.scale,
          duration: 0.5,
          ease: "power2.inOut",
        });

        const note = noteFrequencies[key];
        if (note) {
          synth.triggerAttackRelease(note, "4n");
          gsap.to(keyElement, {
            duration: 0.2,
            scaleY: 0.8,
            yoyo: true,
            repeat: 1,
          });
        }
      }
    };

    // Event listener for keydown
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (keys.includes(key)) {
        playKey(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      synth.dispose();
    };
  }, []);

  // Order the piano keys according to the AZERTY keyboard layout
  const pianoKeys = [
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
  ].map((key) => (
    <div className="white-key" id={key} key={key}></div>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <div className="screen">
          <p>
            Use the keys on your keyboard to play music and to move the ball
          </p>
          <div className="ball" ref={ballRef}></div>
        </div>
        <div className="piano">{pianoKeys}</div>
      </header>
    </div>
  );
};

export default Project;
