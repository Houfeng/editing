import React from "react";
import { AtomChar } from "./AtomChar";

export class AtomSpace extends AtomChar {
  value = " ";
  render() {
    return (
      <span key={this.id}
        data-id={this.id}
        style={this.style}
        dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />
    );
  };
}
