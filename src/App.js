import React from "react";
import "./App.css";

export default class extends React.Component {
  ref = React.createRef();

  last;

  componentDidMount() {
    this.draw();
  }

  draw = () => requestAnimationFrame(this.frame);

  frame = t => {
    const canvas = this.ref.current;
    const gl = canvas.getContext("webgl");

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  render() {
    return <canvas ref={this.ref} width={800} height={800} />;
  }
}
