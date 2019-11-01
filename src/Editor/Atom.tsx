import React from "react";
import shortid from "shortid";

export class Atom {
  value = "";
  style: React.CSSProperties = null;
  id = shortid();
  render: () => React.ReactNode;

  constructor(value = "") {
    this.value = value[0];
  }

  toJSON() {
    return this.style ? [this.value, this.style] : this.value;
  }
}

export class BrAtom extends Atom {
  render = () => {
    return <br />;
  };
}

export class SpaceAtom extends Atom {
  render = () => {
    return <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />;
  };
}
