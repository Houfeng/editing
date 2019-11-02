import React from "react";
import { Atom } from "./Atom";
import { EditorModel } from "./EditorModel";

export interface IAtomRendererProps {
  char: Atom;
  index: number;
  editorModel: EditorModel;
}

export class AtomRenderer extends React.Component<IAtomRendererProps> {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { char, editorModel, index } = this.props;
    if (char.render) return char.render();
    const selected = editorModel.selection.contains(index);
    const className = selected ? "selected" : null;
    return (
      <span className={className}
        ref={ref => ref ? (ref as any).atomIndex = index : null}
        style={char.style}>
        {char.value}
      </span>
    );
  }
}
