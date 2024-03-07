/// <reference types="react" />
import { FlippingPagesCoreProps } from '../components/core';
export interface FlippingPagesWithPerspectiveProps extends FlippingPagesCoreProps {
    perspectiveMultiplier?: number | undefined;
}
export declare const defaultPerspectiveMultiplier = 2;
export declare const FlippingPagesWithPerspective: import("react").MemoExoticComponent<(props: FlippingPagesWithPerspectiveProps) => JSX.Element>;
