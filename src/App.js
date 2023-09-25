import React from "react";
import { gsap } from "gsap";
import "./App.css";

const { useLayoutEffect, useRef } = React;

const Nested = () => {
  return (
    <div className="nested">
      <div className="box">Nested Box</div>
      <div className="circle">Nested Circle</div>
    </div>
  );
};

function App() {
  const app = useRef();
  const circle = useRef();
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".box", { 
        rotation: "+=360", 
        duration: 10, 
        repeat: -1,
        ease: 'none'
      });
      
      gsap.to(circle.current, { 
        rotation: "+=360", 
        duration: 3, 
        repeat: -1,
        ease: 'none'
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

export default App;
