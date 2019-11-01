import { SelectDirection } from "./SelectDirection";

export interface ISelectInfo {
  root: HTMLElement;
  selection: Selection;
  direction: SelectDirection;
  ancestorNode: Node;
  anchorNode: Node;
  focusNode: Node;
  anchorOffset: number;
  focusOffset: number;
  includeNodes: Node[];
  text: string;
}
