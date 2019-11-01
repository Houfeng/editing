import { Char } from "./Char";
import { Selection } from "./Selection";
export declare class TextEditModel {
    value: Char[];
    selection: Selection;
    insertText: (text: string, index?: number) => void;
    breakLine: (index?: number) => void;
    backspace: () => void;
}
