import { EventHandler, PointerEvent as _PointerEvent } from 'react';
declare type PointerEvent = _PointerEvent<HTMLDivElement>;
export declare const pointerEventProps: readonly ["onPointerCancel", "onPointerDown", "onPointerMove", "onPointerUp"];
export declare type PointerEventsEmitter = {
    [K in typeof pointerEventProps[number]]?: EventHandler<PointerEvent> | undefined;
};
export declare const useMergePointerEvents: (...eventsEmitters: readonly (PointerEventsEmitter | undefined)[]) => PointerEventsEmitter;
export {};
