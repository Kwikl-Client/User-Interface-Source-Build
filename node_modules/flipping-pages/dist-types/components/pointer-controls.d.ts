import { PointerEvent as _PointerEvent } from 'react';
import { FlippingPagesWithAnimationProps } from '../components/animation';
declare type PointerEvent = _PointerEvent<HTMLDivElement>;
export interface FlippingPagesWithPointerControlsProps extends FlippingPagesWithAnimationProps {
    disableSwipe?: boolean | undefined;
    noSwipeClass?: string | undefined;
    onOverSwipe?: ((overSwipe: number) => number) | undefined;
    onSwipeEnd?: ((selected: number) => void) | undefined;
    onSwipeStart?: ((event: PointerEvent) => boolean) | undefined;
    onSwipeTurn?: ((selected: number) => void) | undefined;
    swipeLength?: number | undefined;
    swipeSpeed?: number | undefined;
}
export declare const defaultSwipeLength = 400;
export declare const defaultOnSwipeStart: (event: PointerEvent) => boolean;
export declare const defaultSwipeSpeed = 0.1;
export declare const FlippingPagesWithPointerControls: import("react").MemoExoticComponent<(props: FlippingPagesWithPointerControlsProps) => JSX.Element>;
export {};
