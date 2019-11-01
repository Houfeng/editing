import React from "react";
export declare type RenderFunction = () => React.ReactNode;
export declare class Char {
    value: string;
    style: React.CSSProperties;
    id: string;
    render: RenderFunction;
    constructor(value?: string);
}
export declare class BrChar extends Char {
    render: () => JSX.Element;
}
export declare class SpaceChar extends Char {
    render: () => JSX.Element;
}
