import React from "react";
import { Document } from "./Document";
import { Cursor } from "./Cursor";
export declare class Editor extends React.Component {
    model: Document;
    shouldComponentUpdate(): boolean;
    onEditorMouseDown: (event: React.MouseEvent<Element, MouseEvent>) => void;
    componentDidUpdate(): void;
    renderAtoms(): string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | React.ReactNode[];
    cursor: Cursor;
    setCursor: (ref: Cursor) => Cursor;
    renderCursor(): JSX.Element;
    element: HTMLDivElement;
    onRef: (ref: HTMLDivElement) => void;
    render(): JSX.Element;
}
