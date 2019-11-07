import React from "react";
import shortid from "shortid";
import { IValue } from "./IValue";
import { Atom } from "./Atom";

export class AtomChar extends Atom {
  id = shortid();
  value: IValue = "";
  style: React.CSSProperties = null;

  constructor(value = "") {
    super();
    this.value = value[0];
  }

  render() {
    return <span
      key={this.id}
      data-id={this.id}
      style={this.style}>
      {this.value}
    </span>;
  };

  toJSON() {
    return this.style ? [this.value, this.style] : this.value;
  }
}
