import React from "react";
import { model } from "mota";
import { TextEditModel } from "./TextEditModel";
import { BrChar } from "./Char";
import { CharRender } from "./CharRender";

@model(TextEditModel)
export class TextEditor extends React.Component {
  model: TextEditModel;

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

  renderBr(char: BrChar) {
    return <br key={char.id} />;
  }

  renderText() {
    const { value, selection } = this.model;
    const elements = value.map((char, index) => {
      if (char instanceof BrChar) return this.renderBr(char);
      return (
        <CharRender
          key={char.id}
          char={char}
          selected={selection.contains(index)} />
      );
    });
    if (selection.cursor > -1) {
      elements.splice(selection.cursor, 0, this.renderInput());
    }
    return elements;
  }

  isPreventKey = (event: React.KeyboardEvent) => {
    return [13, 8, 46].indexOf(event.keyCode) > -1;
  };

  onKeyDown = (event: React.KeyboardEvent) => {
    if (!this.isPreventKey(event)) return;
    event.preventDefault();
    this.handleBackspaceKey(event);
    this.handleEnterKey(event);
  };

  handleBackspaceKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 8) return;
    this.model.backspace();
  }

  handleEnterKey(event: React.KeyboardEvent) {
    if (event.keyCode !== 13) return;
    this.model.breakLine();
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
    console.log('onEditorMouseDown');
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
    console.log('editor render');
    return (
      <div className="editor" onMouseDown={this.onEditorMouseDown}>
        {this.renderInner()}
      </div>
    );
  }
}
