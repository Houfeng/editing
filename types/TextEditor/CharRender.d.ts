import React from 'react';
import { Char } from './Char';
export interface ICharRenderProps {
    char: Char;
    selected: boolean;
}
export declare class CharRender extends React.Component<ICharRenderProps> {
    shouldComponentUpdate(): boolean;
    render(): JSX.Element;
}
