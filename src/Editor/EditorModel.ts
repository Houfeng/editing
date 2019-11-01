import { Atom, BrAtom, SpaceAtom } from "./Atom";
import { Selection } from "./Selection";

export class EditorModel {
  value: Atom[] = [];

  selection = new Selection();

  insertAtoms = (atomList: Atom[], index = this.selection.cursor) => {
    this.value.splice(index, 0, ...atomList);
    this.selection.cursor += atomList.length;
  };

  insertAtom = (char: Atom, index = this.selection.cursor) => {
    this.insertAtoms([char], index);
  };

  insertText = (text: string, index = this.selection.cursor) => {
    const atomList: Atom[] = [];
    text.split("").forEach(char => {
      if (!char) atomList.push(new SpaceAtom());
      else if (char === "\n") atomList.push(new BrAtom());
      else if (char === "\t") atomList.push(new SpaceAtom(), new SpaceAtom());
      else if (char === "\r") {
      } else atomList.push(new Atom(char));
    });
    this.insertAtoms(atomList, index);
  };

  backspace = () => {
    if (this.selection.cursor <= 0) return;
    this.value.splice(this.moveCursor(-1), 1);
  };

  tab = (index = this.selection.cursor) => {
    this.insertAtoms([new SpaceAtom(), new SpaceAtom()], index);
  };

  breakLine = (index = this.selection.cursor) => {
    this.insertAtom(new BrAtom(), index);
  };

  moveCursor = (num = 1) => {
    this.selection.cursor += num;
    if (this.selection.cursor < 0) {
      this.selection.cursor = 0;
    }
    if (this.selection.cursor > this.value.length) {
      this.selection.cursor = this.value.length;
    }
    return this.selection.cursor;
  };

  moveCursorToLeft = () => {
    this.moveCursor(-1);
  };

  moveCursorToRight = () => {
    this.moveCursor(1);
  };
}
