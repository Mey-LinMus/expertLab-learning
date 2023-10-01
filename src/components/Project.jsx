import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import gsap from "gsap";
import "../style/Project.css";

const Project = () => {
  const ballRef = useRef(null);

  const keys = [
    { note: "C4", key: "A" },
    { note: "C#4", key: "Z" },
    { note: "D4", key: "E" },
    { note: "D#4", key: "R" },
    { note: "E4", key: "T" },
    { note: "F4", key: "Y" },
    { note: "F#4", key: "U" },
    { note: "G4", key: "I" },
    { note: "G#4", key: "O" },
    { note: "A4", key: "P" },
    { note: "A#4", key: "Q" },
    { note: "B4", key: "S" },
    { note: "C5", key: "D" },
    { note: "C#5", key: "F" },
    { note: "D5", key: "G" },
    { note: "D#5", key: "H" },
    { note: "E5", key: "J" },
    { note: "F5", key: "K" },
    { note: "F#5", key: "L" },
    { note: "G5", key: "M" },
    { note: "G#5", key: "W" },
    { note: "A5", key: "X" },
    { note: "A#5", key: "C" },
    { note: "B5", key: "V" },
    { note: "C6", key: "B" },
    { note: "C#6", key: "N" },
  ];

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const ball = ballRef.current;

    const randomAnimation = () => {
      return {
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        scale: Math.random() * 3 + 1,
      };
    };

    const playKey = (key) => {
      const animation = randomAnimation();
      const keyElement = document.getElementById(key.key);
      if (keyElement) {
        gsap.to(ball, {
          x: animation.x,
          y: animation.y,
          scale: animation.scale,
          duration: 0.5,
          ease: "power2.inOut",
        });

        const note = key.note;
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

    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      const foundKey = keys.find((k) => k.key === key);
      if (foundKey) {
        playKey(foundKey);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      synth.dispose();
    };
  });

  const pianoKeys = keys.map((key) => (
    <div className="key" id={key.key} key={key.key}>
      <h3>{key.note}</h3>
      <p>{key.key}</p>
    </div>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <div className="screen">
          <p>Use the keys on your keyboard to play music and move the ball</p>
          <div className="ball" ref={ballRef}></div>
        </div>
        <div className="piano">{pianoKeys}</div>
      </header>
    </div>
  );
};

export default Project;
