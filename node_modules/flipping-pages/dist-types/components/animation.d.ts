/// <reference types="react" />
import { FlippingPagesWithPerspectiveProps } from '../components/perspective';
export interface FlippingPagesWithAnimationProps extends Omit<FlippingPagesWithPerspectiveProps, 'willChange'> {
    animationDuration?: number | undefined;
    onAnimationEnd?: (() => void) | undefined;
    onAnimationStart?: (() => void) | undefined;
    onAnimationTurn?: ((selected: number) => void) | undefined;
    willChange?: boolean | 'auto' | undefined;
}
export declare const defaultAnimationDuration = 400;
export declare const FlippingPagesWithAnimation: import("react").MemoExoticComponent<(props: FlippingPagesWithAnimationProps) => JSX.Element>;
