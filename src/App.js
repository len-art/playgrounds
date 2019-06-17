import React from "react";
import "./App.css";

export default class extends React.Component {
  ref = React.createRef();

  render() {
    return (
      <div style={{ width: "500px", height: "500px" }}>
        <div className="paintMyBottom" />
        <div className="weirdDiv" />
      </div>
    );
  }
}
