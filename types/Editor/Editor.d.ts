import React from "react";
import { EditorModel } from "./EditorModel";
export declare class Editor extends React.Component {
    model: EditorModel;
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
    handleLeftKey(event: React.KeyboardEvent): void;
    handleRightKey(event: React.KeyboardEvent): void;
    handleUpKey(event: React.KeyboardEvent): void;
    handleDownKey(event: React.KeyboardEvent): void;
    renderInput(): JSX.Element;
    onEditorMouseDown: (event: React.MouseEvent<Element, MouseEvent>) => void;
    componentDidUpdate(): void;
    renderInner(): JSX.Element;
    render(): JSX.Element;
}
