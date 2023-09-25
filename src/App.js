import "./App.css";
import { gsap } from "gsap";
import React, { useRef, useLayoutEffect } from "react"; // Import useRef and React

function App() {
  const boxRef = useRef();

  useLayoutEffect(() => {
    // Refs allow you to access DOM nodes
    console.log(boxRef); // { current: div.box }
    // then we can animate them like so...
    gsap.to(boxRef.current, {
      rotation: "+=360"
    });
  }, []); // You should provide a dependency array here if needed.
  
  return (
    <div className="App">
      <div className="box" ref={boxRef}>Hello World</div>
    </div>
  );
}

export default App;
