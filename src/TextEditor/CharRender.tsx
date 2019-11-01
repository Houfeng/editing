import React from 'react';
import { Char } from './Char';

export interface ICharRenderProps {
  char: Char;
  selected: boolean;
}

export class CharRender extends React.Component<ICharRenderProps> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { char, selected } = this.props;
    const className = selected ? "selected" : null;
    return <span className={className} >
      {char.value}
    </span>
  }
}