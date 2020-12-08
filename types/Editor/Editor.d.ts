import { Cursor } from "./Cursor";
import { Document } from "./Document";
import React from "react";
export declare class Editor extends React.PureComponent {
    model: Document;
    onEditorMouseDown: (event: React.MouseEvent) => void;
    componentDidUpdate(): void;
    renderAtoms(): string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | React.ReactNode[];
    cursor: Cursor;
    setCursor: (ref: Cursor) => Cursor;
    renderCursor(): JSX.Element;
    element: HTMLDivElement;
    onRef: (ref: HTMLDivElement) => void;
    render(): JSX.Element;
}
