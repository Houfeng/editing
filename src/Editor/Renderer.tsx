import React from "react";
import ReactDOM from "react-dom";
import { model } from "mota";

export interface IRendererProps {
  model: any;
  render: () => React.ReactNode;
}

@model
export class Renderer extends React.PureComponent<IRendererProps> {

  model: any;

  componentDidMount() {
    this.model.element = ReactDOM.findDOMNode(this);
  }

  render() {
    const { render } = this.props;
    return render();
  }
}
