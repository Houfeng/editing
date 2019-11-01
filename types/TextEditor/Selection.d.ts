export declare class Selection {
    start: number;
    end: number;
    cursor: number;
    select: (start: number, end: number) => void;
    contains: (index: number) => boolean;
}
