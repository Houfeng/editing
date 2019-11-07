import React from "react";
import shortid from "shortid";
import { Renderer } from "./Renderer";
import { IValue } from "./IValue";

export class Atom {
  id = shortid();
  value: IValue = null;

  constructor() {
    this.wrapRender();
  }

  element: HTMLElement;

  wrapRender() {
    const originRender = this.render.bind(this);
    this.render = () => {
      return <Renderer key={this.id} model={this} render={originRender} />;
    };
  }

  render(): React.ReactNode {
    throw new Error('Render method not implemented');
  }

  get length() {
    if (!this.value) return 0;
    const items: IValue[] = [].slice.call(this.value);
    return items.reduce((total: number, item) => {
      return total + item.length;
    }, 0);
  }

  toJSON() {
    return this.value;
  }
}
