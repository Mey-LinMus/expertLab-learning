import React from "react";
import { gsap } from "gsap";
import "../style/Gsap.css";

const { useLayoutEffect, useRef } = React;

const Nested = () => {
  return (
    <div className="nested">
      <div className="box">Nested Box</div>
      <div className="circle">Nested Circle</div>
    </div>
  );
};

function GSAP() {
  const app = useRef();
  const circle = useRef();
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".box", { 
        rotation: 360,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true
      });
      
      gsap.to(circle.current, { 
        x: 100,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true
      });
    }, app);
    
    return () => ctx.revert();
  });

  return (
    <div ref={app} className="App">
      <div className="box">Box</div>
      <div className="circle" ref={circle}>Circle</div>
      <Nested/>
    </div>
  );
}

export default GSAP;
