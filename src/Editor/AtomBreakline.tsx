import React from "react";
import { AtomChar } from "./AtomChar";

export class AtomBreakline extends AtomChar {
  value = "\n";
  render() {
    return <br key={this.id}
      data-id={this.id}
      style={this.style} />;
  };
}
