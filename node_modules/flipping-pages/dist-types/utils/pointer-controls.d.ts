import { FlippingPagesDirection } from '../types';
export interface GetCurrSelectedOptions {
    childrenLength: number;
    diffX: number;
    diffY: number;
    direction: FlippingPagesDirection;
    onOverSwipe: (overSwipe: number) => number;
    startSelected: number;
    swipeLength: number;
}
export declare const getCurrSelected: (options: GetCurrSelectedOptions) => number;
export interface GetNextSelectedOptions extends GetCurrSelectedOptions {
    speedX: number;
    speedY: number;
    swipeSpeed: number;
}
export declare const getNextSelected: (options: GetNextSelectedOptions) => number;
