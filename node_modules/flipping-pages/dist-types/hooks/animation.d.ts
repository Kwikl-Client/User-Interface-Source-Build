export interface UseAnimationOptions {
    callback: (timeElapsed: number) => boolean;
    onEnd: () => void;
    onStart: () => void;
}
export interface UseAnimationResult {
    start: () => void;
    stop: () => void;
}
export declare const useAnimation: (options: UseAnimationOptions) => UseAnimationResult;
