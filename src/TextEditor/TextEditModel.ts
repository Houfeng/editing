import { Char, BrChar } from "./Char";
import { Selection } from "./Selection";

export class TextEditModel {
  value: Char[] = [];

  selection = new Selection();

  insertText = (text: string, index: number = this.selection.cursor) => {
    const charList = text.split("")
      .filter(value => !!value)
      .map(value => new Char(value));
    this.value.splice(index, 0, ...charList);
    this.selection.cursor += charList.length;
  };

  breakLine = (index: number = this.selection.cursor) => {
    this.value.splice(index, 0, new BrChar(""));
    this.selection.cursor += 1;
  };

  backspace = () => {
    if (this.selection.cursor <= 0) return;
    this.value.splice(--this.selection.cursor, 1);
    if (this.selection.cursor < 0) this.selection.cursor = 0;
  };
}
