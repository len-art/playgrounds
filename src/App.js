import React from "react";
import "./App.css";

export default class extends React.Component {
  ref = React.createRef();

  last;

  componentDidMount() {
    this.draw();
  }

  getAdjacentLength = d => Math.tan(this.toRad(45)) * d;

  toRad = deg => (deg * Math.PI) / 180;

  getSlope = (p1, p2) => (p2[0] - p1[0]) / [p2[1] - p1[1]];

  getDistance = (p1, p2) =>
    Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);

  getMidPoint = (p1, p2) => [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];

  getRightAnglePointOnCircle = (c, r, a = 90) => {
    const aInRad = this.toRad(a);
    return [c[0] + r * Math.cos(aInRad), c[1] + r * Math.sin(aInRad)];
  };

  draw = () => requestAnimationFrame(this.frame);

  frame = t => {
    const canvas = this.ref.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const p1 = [200, 300];
    const p2 = [400, 200];
    const c = this.getMidPoint(p1, p2);
    const r = this.getDistance(p1, p2) / 2;
    // const curve = this.getRightAnglePointOnCircle(c, r);
    const oppositeLength = this.getAdjacentLength(r);
    console.log(oppositeLength);

    // ctx.arc(...curve, 2, 0, Math.PI * 2);
    // ctx.fill();

    ctx.moveTo(...c);
    ctx.arc(...c, 2, 0, Math.PI * 2);

    ctx.fill();

    // ctx.arc(...curve, r, 0, Math.PI * 2);
    // ctx.stroke();

    ctx.moveTo(...p1);
    ctx.lineTo(...p2);
    ctx.stroke();

    /*
    const center = [150, 150];
    const l = 50;

    const square = [
      [center[0] - l, center[1] + l],
      [center[0] + l, center[1] + l],
      [center[0] + l, center[1] - l],
      [center[0] - l, center[1] - l]
    ];

    const colors = ["#0f0", "#f00", "#00f", "#FF0"];

    square.forEach((p1, i, self) => {
      const p2 = self[(i + 1) % self.length];
      const c = this.getMidPoint(p1, p2);
      const r = this.getDistance(p1, p2) / 2;
      const curve = this.getRightAnglePointOnCircle(c, r);
      console.log(p1, p2, c, curve);

      ctx.beginPath();
      ctx.strokeStyle = colors[i];
      ctx.moveTo(p1[0], p1[1]);
      ctx.quadraticCurveTo(curve[0], curve[1], p2[0], p2[1]);
      ctx.closePath();
      ctx.stroke();
    });
    */

    // const p1 = [100, 200];
    // const p2 = [200, 200];

    // const c = this.getMidPoint(p1, p2);
    // const r = this.getDistance(p1, p2) / 2;
    // const point = this.getRightAnglePointOnCircle(c, r);

    // ctx.beginPath();
    // ctx.strokeStyle = "#00f";
    // ctx.moveTo(100, 200);
    // ctx.quadraticCurveTo(150, 150, 200, 200);
    // ctx.closePath();
    // ctx.stroke();

    this.last = t;
    // this.draw();
  };

  render() {
    return <canvas ref={this.ref} width={800} height={800} />;
  }
}
