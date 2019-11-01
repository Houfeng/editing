import React from "react";
import { model } from "mota";
import { EditorModel } from "./EditorModel";
import { AtomRenderer } from "./AtomRenderer";

@model(EditorModel)
export class Editor extends React.Component {
  model: EditorModel;

  shouldComponentUpdate() {
    return false;
  }

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

  input: HTMLSpanElement;
  onInputRef = (ref: HTMLSpanElement) => {
    this.input = ref;
  };

  renderText() {
    const { value, selection } = this.model;
    const elements = value.map((char, index) => {
      return (
        <AtomRenderer
          key={char.id}
          char={char}
          selected={selection.contains(index)}
        />
      );
    });
    if (selection.cursor > -1) {
      elements.splice(selection.cursor, 0, this.renderInput());
    }
    return elements;
  }

  isPreventKey = (event: React.KeyboardEvent) => {
    return [13, 8, 46, 9, 37, 38, 39, 40].indexOf(event.keyCode) > -1;
  };

  onKeyDown = (event: React.KeyboardEvent) => {
    console.log("onKeyDown", event.keyCode);
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
  }

  handleRightKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 39) return;
    this.model.moveCursor(1);
  }

  handleUpKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 38) return;
    this.model.moveCursor(-1);
  }

  handleDownKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 40) return;
    this.model.moveCursor(1);
  }

  renderInput() {
    return (
      <span
        key="cursor"
        className="cursor"
        ref={this.onInputRef}
        contentEditable={true}
        onCompositionStart={this.onCompositionStart}
        onCompositionEnd={this.onCompositionEnd}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
      />
    );
  }

  onEditorMouseDown = (event: React.MouseEvent) => {
    if (!this.input) return;
    console.log("onEditorMouseDown");
    event.preventDefault();
    this.input.focus();
  };

  componentDidUpdate() {
    const { cursor } = this.model.selection;
    if (cursor > -1) {
      this.input.focus();
    } else {
      this.input.blur();
    }
  }

  renderInner() {
    return <div className="inner">{this.renderText()}</div>;
  }

  render() {
    (window as any).editModel = this.model;
    console.log("editor render");
    return (
      <div className="editor" onMouseDown={this.onEditorMouseDown}>
        {this.renderInner()}
      </div>
    );
  }
}
