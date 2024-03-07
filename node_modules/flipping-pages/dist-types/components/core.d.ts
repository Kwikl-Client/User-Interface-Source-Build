import { ComponentType, HTMLAttributes, ReactNode, Ref } from 'react';
import { FlippingPagesDirection, FlippingPagesShadowProps } from '../types';
export interface FlippingPagesCoreProps {
    children?: ReactNode | undefined;
    containerProps?: HTMLAttributes<HTMLDivElement> | undefined;
    containerRef?: Ref<HTMLDivElement> | undefined;
    direction: FlippingPagesDirection;
    selected: number;
    shadowBackground?: string | undefined;
    shadowComponent?: ComponentType<FlippingPagesShadowProps> | undefined;
    willChange?: boolean | undefined;
}
export declare const FlippingPagesCore: import("react").MemoExoticComponent<(props: FlippingPagesCoreProps) => JSX.Element>;
