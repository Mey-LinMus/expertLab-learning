// src/components/AudioPlayer.js
import React, { useEffect } from "react";
import * as Tone from "tone";

function AudioPlayer() {
  // Create a simple synth
  const synth = new Tone.Synth().toDestination();

  // Function to play a note
  const playNote = () => {
    synth.triggerAttackRelease("C4", "4n");
  };

  useEffect(() => {
    // Initialize Tone.js
    Tone.start();

    // Clean up when the component unmounts
    return () => {
      synth.dispose();
    };
  }, []);

  return (
    <div>
      <h1>Audio Player</h1>
      <button onClick={playNote}>Play Note</button>
    </div>
  );
}

export default AudioPlayer;
