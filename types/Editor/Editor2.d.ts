import React from "react";
export interface IChar {
    value: string;
    style?: React.CSSProperties;
    input?: boolean;
}
export declare class TextEditModel {
    value: IChar[];
}
export declare class TextEditor extends React.Component {
    model: TextEditModel;
    insertText: (index: number, text: string) => void;
    onInput: (event: React.FormEvent<HTMLSpanElement>) => void;
    composition: boolean;
    onCompositionStart: () => void;
    onCompositionEnd: (event: React.FormEvent<HTMLSpanElement>) => void;
    element: HTMLSpanElement;
    onRef: (ref: HTMLSpanElement) => HTMLSpanElement;
    renderText(): JSX.Element[];
    render(): JSX.Element;
}
