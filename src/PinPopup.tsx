import React from "react";

export default (props: { vehicleId?: string; handleClose(): void }) => (
  <div
    className="pinPopup"
    style={{ transform: `translateY(${props.vehicleId ? 0 : 100}px)` }}
  >
    You clicked {props.vehicleId}
    <button onClick={props.handleClose}>close</button>
  </div>
);
