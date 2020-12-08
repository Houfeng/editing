import { Document } from "./Document";
import React from "react";
import { model } from "mota";
export interface ICursorProps {
  model: Document;
}

@model
export class Cursor extends React.PureComponent<ICursorProps> {

  model: Document;

  onInput = () => {
    if (!this.composition) {
      const text = this.input.textContent;
      this.model.insertText(text);
      this.input.textContent = "";
    }
    this.input.focus();
  };

  composition = false;
  onCompositionStart = () => {
    this.composition = true;
  };

  onCompositionEnd = () => {
    const text = this.input.textContent;
    this.model.insertText(text);
    this.input.textContent = "";
    this.composition = false;
  };

  isPreventKey = (event: React.KeyboardEvent) => {
    return [13, 8, 46, 9, 37, 38, 39, 40].indexOf(event.keyCode) > -1;
  };

  onKeyDown = (event: React.KeyboardEvent) => {
    if (!this.isPreventKey(event)) return;
    event.preventDefault();
    this.handleBackspaceKey(event);
    this.handleEnterKey(event);
    this.handleTabKey(event);
    this.handleLeftKey(event);
    this.handleRightKey(event);
    this.handleUpKey(event);
    this.handleDownKey(event);
  };

  handleBackspaceKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 8) return;
    this.model.backspace();
  }

  handleEnterKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 13) return;
    this.model.breakLine();
  }

  handleTabKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 9) return;
    this.model.tab();
  }

  handleLeftKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 37) return;
    this.model.moveCursor(-1);
    this.updatePosition();
  }

  handleRightKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 39) return;
    this.model.moveCursor(1);
    this.updatePosition();
  }

  handleUpKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 38) return;
    const rect = this.input.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - rect.height / 2;
    const target = document.elementFromPoint(x, y);
    if (!target) return;
    const { atomIndex } = target as any;
    if (isNaN(atomIndex)) return;
    this.model.selection.cursor = atomIndex;
    this.updatePosition();
  }

  handleDownKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 40) return;
    const rect = this.input.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.bottom + rect.height / 2;
    const target = document.elementFromPoint(x, y);
    if (!target) return;
    const { atomIndex } = target as any;
    if (isNaN(atomIndex)) return;
    this.model.selection.cursor = atomIndex;
    this.updatePosition();
  }

  onEditorMouseDown = (event: React.MouseEvent) => {
    if (!this.input) return;
    event.preventDefault();
    this.input.focus();
  };

  componentDidUpdate() {
    this.updateFocus();
  }

  input: HTMLSpanElement;
  onRef = (ref: HTMLSpanElement) => {
    this.input = ref;
  };

  focus = () => {
    if (!this.input) return;
    this.input.focus();
  }

  blur = () => {
    if (!this.input) return;
    this.input.blur();
  }

  updateFocus() {
    const cursor = this.model.selection.cursor;
    if (cursor > -1) {
      this.input.focus();
    } else {
      this.input.blur();
    }
  }

  updatePosition() {
    const atom = this.model.getCurrent();
    if (!atom || !atom.element) return;
    const cursor = this.model.selection.cursor;
    this.input.parentNode.removeChild(this.input);
    if (cursor >= this.model.length) {
      atom.element.parentNode.appendChild(this.input);
    } else {
      atom.element.parentNode.insertBefore(this.input, atom.element);
    }
  }

  componentDidMount() {
    this.updatePosition();
    this.updateFocus();
  }

  render() {
    return (
      <span
        key="cursor"
        data-index={this.model.selection.cursor}
        className="cursor"
        ref={this.onRef}
        contentEditable={true}
        onCompositionStart={this.onCompositionStart}
        onCompositionEnd={this.onCompositionEnd}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
      />
    );
  }

}