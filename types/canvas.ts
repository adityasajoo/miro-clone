export type Color = {
    r: number;
    g: number;
    b: number;
}

export type Camera = {
    x: number;
    y: number;
    // zoom: number;
}

export enum LayerType {
    Text,
    Path,
    Rectangle,
    Ellipse,
    Note
}

export type RectangleLayer = {
    type: LayerType.Rectangle;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
}

export type EllipseLayer = {
    type: LayerType.Ellipse;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
}

export type PathLayer = {
    type: LayerType.Path;
    points: number[][];
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
}

export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
}

export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
}

export type Point = {
    x: number;
    y: number;
}

export type XYWH = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8
}

export type CanvasState =
    | { mode: CanvasMode.None }
    | { mode: CanvasMode.SelectionNet, origin: Point, current?: Point }
    | { mode: CanvasMode.Translating, current: Point }
    | {
        mode: CanvasMode.Inserting,
        LayerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note
    }
    | { mode: CanvasMode.Pencil }
    | { mode: CanvasMode.Pressing, origin: Point }
    | { mode: CanvasMode.Resizing, initialBounds: XYWH, corner: Side }


export enum CanvasMode {
    None, //default
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil
}

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer