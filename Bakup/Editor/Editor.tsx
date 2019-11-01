import React, { Component } from "react";
import { SelectDirection } from "./SelectDirection";
import { ISelectInfo } from "./ISelectInfo";
import { isSafari } from "./Browser";

export type ITextSplitHandler = (text: string) => Node;

export class Editor extends Component {
  /**
   * 对应的编辑元素
   */
  element: HTMLDivElement;

  /**
   * 在 ref 时拿到 element 引用
   */
  onRef = (ref: HTMLDivElement) => {
    this.element = ref;
    this.checkLastBr();
  };

  /**
   * 检查编辑内容最后一个元素是否不结束标记 br
   */
  checkLastBr = () => {
    const { childNodes } = this.element;
    const className = "__end__";
    const lastChild = childNodes[childNodes.length - 1];
    if (
      lastChild &&
      lastChild instanceof HTMLBRElement &&
      lastChild.classList.contains(className)
    ) {
      return;
    }
    const end = document.createElement("br");
    end.classList.add(className);
    this.element.appendChild(end);
  };

  /**
   * 是否是需要阻止直接输入的按键
   */
  isPreventKey = (event: React.KeyboardEvent) => {
    // return [13, 8, 46].indexOf(event.keyCode) > -1;
    return [13].indexOf(event.keyCode) > -1;
  };

  /**
   * 在键盘按下时
   */
  onKeyDown = (event: React.KeyboardEvent) => {
    if (this.isPreventKey(event)) event.preventDefault();
    this.checkLastBr();
    this.handleEnterKey(event);
    // this.handleBackspaceKey(event);
    // this.handleDeleteKey(event);
  };

  /**
   * 处理回车键
   */
  handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.keyCode !== 13) return;
    const br = document.createElement("br");
    this.insertNode(br);
  };

  /**
   * 处理删除键
   */
  // handleDeleteKey = (event: React.KeyboardEvent) => {
  //   if (event.keyCode !== 46) return;
  //   this.deleteSelected();
  // };

  /**
   * 处理退格键
   */
  // handleBackspaceKey = (event: React.KeyboardEvent) => {
  //   if (event.keyCode !== 8) return;
  //   const info = this.getSelectedInfo();
  //   if (info.text) return this.deleteSelected();
  // };

  /**
   * 在光标处插入一个节点
   * @param node 节点
   */
  insertNode(node: Node) {
    this.deleteSelected();
    const { focusNode, focusOffset } = this.getSelectedInfo();
    if (focusNode instanceof Text) {
      this.splitTextNode(focusNode, focusOffset, focusOffset, () => node);
    } else {
      const afterNode = focusNode.childNodes[focusOffset];
      afterNode.parentNode.insertBefore(node, afterNode);
    }
    this.moveCursorToAfter(node);
  }

  /**
   * 删除先中的内容
   */
  deleteSelected() {
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
  }

  /**
   * 将一个拆分为三个或两个
   * @param node 文本节点
   * @param start 选区开始位
   * @param end 选区结束位
   */
  splitTextNode(
    node: Node,
    start: number,
    end: number = start,
    handler?: ITextSplitHandler
  ) {
    if (!node || !node.parentNode) return;
    const { parentNode, textContent = "" } = node;
    const beforeText = textContent.slice(0, start);
    const beforeNode = beforeText ? document.createTextNode(beforeText) : null;
    const selectText = textContent.slice(start, end);
    const selectNode = handler
      ? handler(selectText)
      : selectText
        ? document.createTextNode(selectText)
        : null;
    const afterText = textContent.slice(end);
    const afterNode = afterText ? document.createTextNode(afterText) : null;
    if (beforeNode) parentNode.insertBefore(beforeNode, node);
    if (selectNode) parentNode.insertBefore(selectNode, node);
    if (afterNode) parentNode.insertBefore(afterNode, node);
    parentNode.removeChild(node);
    return [beforeNode, selectNode, afterNode];
  }

  /**
   * 分隔部分文本选中的文本节点（选区在同一文本节点中）
   */
  splitSelectedForOnlyOne = (
    selectInfo: ISelectInfo,
    handler?: ITextSplitHandler
  ) => {
    const { focusNode, anchorOffset, focusOffset } = selectInfo;
    if (!focusNode || !(focusNode instanceof Text)) return;
    const start = anchorOffset < focusOffset ? anchorOffset : focusOffset;
    const end = focusOffset > anchorOffset ? focusOffset : anchorOffset;
    return this.splitTextNode(focusNode, start, end, handler);
  };

  /**
   * 分隔部分文本选中的开始文本节点
   */
  splitSelectedForAnchorNode = (
    selectInfo: ISelectInfo,
    handler?: ITextSplitHandler
  ) => {
    const { anchorNode, anchorOffset, direction } = selectInfo;
    if (!anchorNode || !(anchorNode instanceof Text)) return;
    const start = direction === SelectDirection.leftToRight ? anchorOffset : 0;
    const end =
      direction === SelectDirection.leftToRight
        ? anchorNode.textContent.length
        : anchorOffset;
    return this.splitTextNode(anchorNode, start, end, handler);
  };

  /**
   * 分隔部分文本选中的结束文本节点
   */
  splitSelectedForFocusNode = (
    selectInfo: ISelectInfo,
    handler?: ITextSplitHandler
  ) => {
    const { focusNode, focusOffset, direction } = selectInfo;
    if (!focusNode || !(focusNode instanceof Text)) return;
    const start = direction === SelectDirection.leftToRight ? 0 : focusOffset;
    const end =
      direction === SelectDirection.leftToRight
        ? focusOffset
        : focusNode.textContent.length;
    return this.splitTextNode(focusNode, start, end, handler);
  };

  /**
   * 分隔部分文本选中的文本节点
   */
  splitSelectedNode = (handler?: ITextSplitHandler) => {
    const selectInfo = this.getSelectedInfo();
    const { direction } = selectInfo;
    let anchorNode: Node, focusNode: Node;
    if (direction === SelectDirection.onlyOne) {
      const focusNodes = this.splitSelectedForOnlyOne(selectInfo, handler);
      if (focusNodes && focusNodes[1]) {
        anchorNode = focusNodes[1];
        focusNode = focusNodes[1];
      }
    } else {
      const anchorNodes = this.splitSelectedForAnchorNode(selectInfo, handler);
      const focusNodes = this.splitSelectedForFocusNode(selectInfo, handler);
      if (anchorNodes && anchorNodes[1]) anchorNode = anchorNodes[1];
      if (focusNodes && focusNodes[1]) focusNode = focusNodes[1];
    }
    if (anchorNode && focusNode) this.selectNodes(anchorNode, focusNode);
    return [anchorNode, focusNode];
  };

  /**
   * 选中起止 Node 间的内容
   * @param anchorNode 开始的文本节点
   * @param focusNode 结束的文本节点
   */
  selectNodes(anchorNode: Node, focusNode: Node) {
    const selection = document.getSelection();
    const range = document.createRange();
    if (!focusNode) return;
    if (anchorNode === focusNode) {
      if (isSafari) range.selectNode(focusNode);
      else range.selectNodeContents(focusNode);
    } else {
      const direction = this.calcSelectDirection(anchorNode, focusNode);
      if (direction === SelectDirection.leftToRight) {
        range.setStartBefore(anchorNode);
        range.setEndAfter(focusNode);
      } else {
        range.setStartBefore(focusNode);
        range.setEndAfter(anchorNode);
      }
    }
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * 选择全部
   */
  selectAll = () => {
    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNodeContents(this.element);
    selection.removeAllRanges();
    selection.addRange(range);
    const { anchorNode, focusNode, includeNodes } = this.getSelectedInfo();
    if (anchorNode === this.element && focusNode === this.element) {
      this.selectNodes(includeNodes[0], includeNodes[includeNodes.length - 1]);
    }
  };

  /**
   * 取消选择
   */
  cancelSelect = () => {
    const selection = document.getSelection();
    selection.removeAllRanges();
  };

  /**
   * 移动光标到节点前或后
   * @param node 节点
   * @param toStart 是否到节点前
   */
  moveCursorToNode(node: Node, toStart = false) {
    if (!node || !node.parentNode) return;
    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNode(node);
    range.collapse(toStart);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * 移动光标到节点后
   * @param node 节点
   */
  moveCursorToAfter(node: Node) {
    return this.moveCursorToNode(node, false);
  }

  /**
   * 移动光标到节点前
   * @param node 节点
   */
  moveCursorToBefore(node: Node) {
    return this.moveCursorToNode(node, true);
  }

  /**
   * 查找所有被全部包含在选区中的节点
   * @param node 根节点
   * @param selection 选择信息
   * @param range 选区对象
   */
  findIncludeNodes = (node: Node, selection: Selection, range: Range) => {
    if (
      node !== range.commonAncestorContainer &&
      selection.containsNode(node)
    ) {
      return [node];
    }
    if (!node.childNodes) return [];
    const nodeList = [].slice
      .call(node.childNodes)
      .map((child: Node) => this.findIncludeNodes(child, selection, range))
      .reduce((list: Node[], current: Node[]) => [...list, ...current], []);
    return nodeList as Node[];
  };

  /**
   * 计算选区拖动方向
   */
  calcSelectDirection = (anchorNode: Node, focusNode: Node) => {
    const position = anchorNode.compareDocumentPosition(focusNode);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
      return SelectDirection.leftToRight;
    } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
      return SelectDirection.rightToLeft;
    } else {
      return SelectDirection.onlyOne;
    }
  };

  /**
   * 获取选区信息
   */
  getSelectedInfo(): ISelectInfo {
    const selection = document.getSelection();
    if (selection.rangeCount < 1) return {} as ISelectInfo;
    const range = selection.getRangeAt(0);
    const ancestorNode = range.commonAncestorContainer;
    const { anchorNode, focusNode } = selection;
    const includeNodes = this.findIncludeNodes(ancestorNode, selection, range);
    const text = selection.toString();
    const root = this.element;
    const { anchorOffset, focusOffset } = selection;
    const direction = this.calcSelectDirection(anchorNode, focusNode);
    return {
      root,
      selection,
      direction,
      ancestorNode,
      anchorNode,
      focusNode,
      anchorOffset,
      focusOffset,
      includeNodes,
      text
    };
  }

  /**
   * 将选中区域的 text 节点包装为元素
   */
  wrapElementToSelected = () => {
    this.splitSelectedNode((text: string) => {
      const span = document.createElement("span");
      span.textContent = text;
      return span;
    });
  };

  /**
   * 为单个元素添加样式
   */
  setStyleToElement = (element: HTMLElement, style: React.CSSProperties) => {
    if (
      !element ||
      !element.style ||
      element === this.element ||
      element instanceof HTMLBRElement
    ) {
      return;
    }
    Object.entries(style).forEach(([key, value]) => {
      const name = key.replace(/([A-Z])/g, $ => "-" + $.toLowerCase());
      (element.style as any)[name] = value;
    });
  };

  /**
   * 为一组无素添加样式
   */
  setStyleToElements = (
    elements: HTMLElement[],
    style: React.CSSProperties
  ) => {
    elements.forEach(element => {
      this.setStyleToElement(element, style);
      if (element.childNodes) {
        this.setStyleToElements([].slice.call(element.childNodes), style);
      }
    });
  };

  /**
   * 设置选中元素的样式
   */
  setStyleToSelected = (style: React.CSSProperties) => {
    this.wrapElementToSelected();
    const { includeNodes } = this.getSelectedInfo();
    includeNodes.forEach(element => {
      if (element instanceof Text) {
        const span = document.createElement("span");
        span.textContent = element.textContent;
        element.parentNode.insertBefore(span, element);
        element.parentNode.removeChild(element);
        element = span;
      }
      if (element !== this.element) {
        this.setStyleToElements([element as HTMLElement], style);
      }
    });
  };

  /**
   * 设置所有编辑内容子元素
   */
  setStyleToAll = (style: React.CSSProperties) => {
    this.selectAll();
    this.wrapElementToSelected();
    this.setStyleToSelected(style);
    this.cancelSelect();
  };

  /**
   * 设置样式
   */
  setStyle = (style: React.CSSProperties) => {
    const { text } = this.getSelectedInfo();
    return text ? this.setStyleToSelected(style) : this.setStyleToAll(style);
  };

  getContent() {
    return "你好中国".split('').map(char => {
      return `<span contenteditable="false">${char}</span>`
    }).join('');
  }

  /**
   * 渲染编辑器
   */
  render() {
    (window as any).editor = this;
    return (
      <div className="editor">
        <div
          className="inner"
          contentEditable={true}
          dangerouslySetInnerHTML={{ __html: this.getContent() }}
          ref={this.onRef}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

export default Editor;
