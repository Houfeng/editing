import React, { Component } from "react";
import { SelectDirection } from "./SelectDirection";
import { ISelectInfo } from "./ISelectInfo";
export declare type ITextSplitHandler = (text: string) => Node;
export declare class Editor extends Component {
    /**
     * 对应的编辑元素
     */
    element: HTMLDivElement;
    /**
     * 在 ref 时拿到 element 引用
     */
    onRef: (ref: HTMLDivElement) => void;
    /**
     * 检查编辑内容最后一个元素是否不结束标记 br
     */
    checkLastBr: () => void;
    /**
     * 是否是需要阻止直接输入的按键
     */
    isPreventKey: (event: React.KeyboardEvent<Element>) => boolean;
    /**
     * 在键盘按下时
     */
    onKeyDown: (event: React.KeyboardEvent<Element>) => void;
    /**
     * 处理回车键
     */
    handleEnterKey: (event: React.KeyboardEvent<Element>) => void;
    /**
     * 处理删除键
     */
    /**
     * 处理退格键
     */
    /**
     * 在光标处插入一个节点
     * @param node 节点
     */
    insertNode(node: Node): void;
    /**
     * 删除先中的内容
     */
    deleteSelected(): void;
    /**
     * 将一个拆分为三个或两个
     * @param node 文本节点
     * @param start 选区开始位
     * @param end 选区结束位
     */
    splitTextNode(node: Node, start: number, end?: number, handler?: ITextSplitHandler): Node[];
    /**
     * 分隔部分文本选中的文本节点（选区在同一文本节点中）
     */
    splitSelectedForOnlyOne: (selectInfo: ISelectInfo, handler?: ITextSplitHandler) => Node[];
    /**
     * 分隔部分文本选中的开始文本节点
     */
    splitSelectedForAnchorNode: (selectInfo: ISelectInfo, handler?: ITextSplitHandler) => Node[];
    /**
     * 分隔部分文本选中的结束文本节点
     */
    splitSelectedForFocusNode: (selectInfo: ISelectInfo, handler?: ITextSplitHandler) => Node[];
    /**
     * 分隔部分文本选中的文本节点
     */
    splitSelectedNode: (handler?: ITextSplitHandler) => Node[];
    /**
     * 选中起止 Node 间的内容
     * @param anchorNode 开始的文本节点
     * @param focusNode 结束的文本节点
     */
    selectNodes(anchorNode: Node, focusNode: Node): void;
    /**
     * 选择全部
     */
    selectAll: () => void;
    /**
     * 取消选择
     */
    cancelSelect: () => void;
    /**
     * 移动光标到节点前或后
     * @param node 节点
     * @param toStart 是否到节点前
     */
    moveCursorToNode(node: Node, toStart?: boolean): void;
    /**
     * 移动光标到节点后
     * @param node 节点
     */
    moveCursorToAfter(node: Node): void;
    /**
     * 移动光标到节点前
     * @param node 节点
     */
    moveCursorToBefore(node: Node): void;
    /**
     * 查找所有被全部包含在选区中的节点
     * @param node 根节点
     * @param selection 选择信息
     * @param range 选区对象
     */
    findIncludeNodes: (node: Node, selection: Selection, range: Range) => Node[];
    /**
     * 计算选区拖动方向
     */
    calcSelectDirection: (anchorNode: Node, focusNode: Node) => SelectDirection;
    /**
     * 获取选区信息
     */
    getSelectedInfo(): ISelectInfo;
    /**
     * 将选中区域的 text 节点包装为元素
     */
    wrapElementToSelected: () => void;
    /**
     * 为单个元素添加样式
     */
    setStyleToElement: (element: HTMLElement, style: React.CSSProperties) => void;
    /**
     * 为一组无素添加样式
     */
    setStyleToElements: (elements: HTMLElement[], style: React.CSSProperties) => void;
    /**
     * 设置选中元素的样式
     */
    setStyleToSelected: (style: React.CSSProperties) => void;
    /**
     * 设置所有编辑内容子元素
     */
    setStyleToAll: (style: React.CSSProperties) => void;
    /**
     * 设置样式
     */
    setStyle: (style: React.CSSProperties) => void;
    getContent(): string;
    /**
     * 渲染编辑器
     */
    render(): JSX.Element;
}
export default Editor;
