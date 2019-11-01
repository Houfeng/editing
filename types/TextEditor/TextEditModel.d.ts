import { Char } from "./Char";
import { Selection } from "./Selection";
export declare class TextEditModel {
    value: Char[];
    selection: Selection;
    insertChars: (charList: Char[], index?: number) => void;
    insertText: (text: string, index?: number) => void;
    insertChar: (char: Char, index?: number) => void;
    backspace: () => void;
    tab: (index?: number) => void;
    breakLine: (index?: number) => void;
}
