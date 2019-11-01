import React from "react";
import { Atom } from "./Atom";

export interface IAtomRendererProps {
  char: Atom;
  selected: boolean;
}

export class AtomRenderer extends React.Component<IAtomRendererProps> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { char, selected } = this.props;
    if (char.render) return char.render();
    const className = selected ? "selected" : null;
    return (
      <span className={className} style={char.style}>
        {char.value}
      </span>
    );
  }
}
