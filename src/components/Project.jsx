import React, { useEffect, useRef } from "react";
import "../style/Project.css";
import * as Tone from "tone";
import gsap from "gsap";

const Project = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const ball = ballRef.current;

    // Pace-man animations
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
      F: { x: 150, y: -200, scale: 2 },
      G: { x: 50, y: -300, scale: 3 },
      H: { x: 300, y: -300, scale: 2.5 },
      J: { x: -300, y: 250, scale: 3.5 },
      K: { x: -250, y: -250, scale: 2.5 },
      L: { x: 250, y: 250, scale: 3.5 },
      M: { x: -250, y: 250, scale: 3 },
      W: { x: -200, y: 200, scale: 3 },
      X: { x: 200, y: -200, scale: 2.5 },
      C: { x: 300, y: 300, scale: 3 },
      V: { x: -300, y: -300, scale: 2 },
      B: { x: 300, y: -300, scale: 2 },
      N: { x: -300, y: 300, scale: 2.5 },
    };

    const defaultAnimation = { x: 0, y: 0, scale: 0.5 };

    // Notes of the keys
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

    //Array of keys
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

    // Function to play the animation and note for a key
    const playKey = (key) => {
      const animation = animations[key] || defaultAnimation;
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

  // Create piano keys JSX
  const pianoKeys = Array.from({ length: 26 }, (_, index) => {
    const key = String.fromCharCode(65 + index);
    return <div className="white-key" id={key} key={key}></div>;
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="piano">{pianoKeys}</div>
        <p>
          Use the keys on your keyboard to play music and to move the ball
        </p>
        <div className="ball" ref={ballRef}></div>
      </header>
    </div>
  );
};

export default Project;
