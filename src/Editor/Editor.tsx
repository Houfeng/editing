import { Cursor } from "./Cursor";
import { Document } from "./Document";
import React from "react";
import { model } from "mota";

@model(Document)
export class Editor extends React.PureComponent {
  model: Document;

  onEditorMouseDown = (event: React.MouseEvent) => {
    if (!this.cursor) return;
    event.preventDefault();
    this.cursor.focus();
  };

  componentDidUpdate() {
    const { cursor } = this.model.selection;
    if (cursor > -1) {
      this.cursor.focus();
    } else {
      this.cursor.blur();
    }
  }

  renderAtoms() {
    const atoms = this.model.render();
    return atoms;
  }

  cursor: Cursor;
  setCursor = (ref: Cursor) => this.cursor = ref;

  renderCursor() {
    return <Cursor ref={this.setCursor} model={this.model} />
  }

  element: HTMLDivElement;
  onRef = (ref: HTMLDivElement) => {
    this.element = ref;
  };

  render() {
    (window as any).editor = this;
    return (
      <div
        className="editor"
        ref={this.onRef}
        onMouseDown={this.onEditorMouseDown}
      >
        {this.renderAtoms()}
        {this.renderCursor()}
      </div>
    );
  }
}