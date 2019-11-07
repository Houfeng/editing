import { Atom } from "./Atom";
import { Selection } from "./Selection";
import { AtomBreakline } from "./AtomBreakline";
import { AtomSpace } from "./AtomSpace";
import { AtomChar } from "./AtomChar";
import { AtomGroup } from "./AtomGroup";

export class Document extends AtomGroup {
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
      if (char === ' ') atomList.push(new AtomSpace());
      else if (char === "\n") atomList.push(new AtomBreakline());
      else if (char === "\t") atomList.push(new AtomSpace(), new AtomSpace());
      else if (char === "\r") {
        //none
      } else {
        atomList.push(new AtomChar(char));
      }
    });
    this.insertAtoms(atomList, index);
  };

  backspace = () => {
    if (this.selection.cursor <= 0) return;
    this.value.splice(this.moveCursor(-1), 1);
  };

  tab = (index = this.selection.cursor) => {
    this.insertAtoms([new AtomSpace(), new AtomSpace()], index);
  };

  breakLine = (index = this.selection.cursor) => {
    this.insertAtom(new AtomBreakline(), index);
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

  getCurrent = () => {
    const index = this.selection.cursor;
    return this.value[index] || this.value[this.value.length - 1];
  }

}
