import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Howl, Howler } from 'howler';
import * as Tone from 'tone';
import '../style/Project.css'

const Project = () => {
  const circleRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(null);

 // Function to create the GSAP animation
const animateCircle = () => {
    const tl = gsap.timeline();
  
    // Adjust the animation parameters for a more pronounced bounce
    tl.to(circleRef.current, { y: -30, duration: 0.1, ease: 'power1.inOut' })
      .to(circleRef.current, { y: 0, duration: 0.1, ease: 'power1.inOut' });
  };
  

  // Function to set up the Howler.js sound
  const setupSound = () => {
    const audio = new Howl({
      src: ['/music/love.mp3'], // Adjust the path to your music file
      onload: () => {
        // Animation can start when the music loads
        animateCircle();
        setIsPlaying(true);
      },
    });

    audio.on('end', () => {
      setIsPlaying(false);
    });

    return audio;
  };

  useEffect(() => {
    sound.current = setupSound();

    // Set up Tone.js Transport
    Tone.Transport.bpm.value = 120; // Adjust the BPM (beats per minute) as needed

    // Create a Tone.js Part to trigger the animation on each beat
    const part = new Tone.Part((time) => {
      animateCircle();
    }, ['0:0:0', '0:1:0', '0:2:0', '0:3:0']); // Adjust the pattern as needed

    // Connect the Part to the Transport and start it when the music plays
    sound.current.on('play', () => {
      Tone.Transport.start();
      part.start();
    });

    return () => {
      // Clean up Howler.js sound and Tone.js Transport when the component unmounts
      sound.current.unload();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      sound.current.pause();
      Tone.Transport.pause();
    } else {
      sound.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="center-container">
      <div
        ref={circleRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
          borderRadius: '50%',
          position: 'relative',
        }}
      ></div>
      <button onClick={togglePlayback} className="play-button">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default Project;
