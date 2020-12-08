import { AtomChar } from "./AtomChar";
import React from "react";
import { observable } from "mota";

@observable
export class AtomBreakLine extends AtomChar {
  value = "\n";
  render() {
    return <br key={this.id}
      data-id={this.id}
      style={this.style} />;
  };
}
