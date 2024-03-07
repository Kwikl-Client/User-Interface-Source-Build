import { EventHandler, PointerEvent as _PointerEvent } from 'react';
declare type PointerEvent = _PointerEvent<HTMLDivElement>;
export interface UsePointerEventsOnMoveOptions {
    diffX: number;
    diffY: number;
}
export interface UsePointerEventsOnUpOptions extends UsePointerEventsOnMoveOptions {
    speedX: number;
    speedY: number;
}
export interface UsePointerEventsOptions {
    onDown: (event: PointerEvent) => boolean;
    onMove: (options: UsePointerEventsOnMoveOptions) => void;
    onUp: (options: UsePointerEventsOnUpOptions) => void;
}
export interface UsePointerEventsResult {
    cancelPointer: () => void;
    onPointerCancel: EventHandler<PointerEvent>;
    onPointerDown: EventHandler<PointerEvent>;
    onPointerMove: EventHandler<PointerEvent>;
    onPointerUp: EventHandler<PointerEvent>;
    pointerDown: boolean;
}
export declare const usePointerEvents: (options: UsePointerEventsOptions) => UsePointerEventsResult;
export {};
