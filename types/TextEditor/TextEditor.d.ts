import React from "react";
import { TextEditModel } from "./TextEditModel";
export declare class TextEditor extends React.Component {
    model: TextEditModel;
    shouldComponentUpdate(): boolean;
    onInput: () => void;
    composition: boolean;
    onCompositionStart: () => void;
    onCompositionEnd: () => void;
    input: HTMLSpanElement;
    onInputRef: (ref: HTMLSpanElement) => void;
    renderText(): JSX.Element[];
    isPreventKey: (event: React.KeyboardEvent<Element>) => boolean;
    onKeyDown: (event: React.KeyboardEvent<Element>) => void;
    handleBackspaceKey(event: React.KeyboardEvent): void;
    handleEnterKey(event: React.KeyboardEvent): void;
    handleTabKey(event: React.KeyboardEvent): void;
    renderInput(): JSX.Element;
    onEditorMouseDown: (event: React.MouseEvent<Element, MouseEvent>) => void;
    componentDidUpdate(): void;
    renderInner(): JSX.Element;
    render(): JSX.Element;
}
