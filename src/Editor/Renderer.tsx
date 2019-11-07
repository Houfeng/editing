import React from "react";
import { model } from "mota";
import ReactDOM from "react-dom";

export interface IRendererProps {
  model: any;
  render: () => React.ReactNode;
}

@model
export class Renderer extends React.Component<IRendererProps> {

  model: any;

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.model.element = ReactDOM.findDOMNode(this);
  }

  render() {
    const { render } = this.props;
    return render();
  }
}
