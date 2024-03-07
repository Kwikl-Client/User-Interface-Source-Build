import { EventHandler, SyntheticEvent } from 'react';
export declare const useMergeEvents: <T extends SyntheticEvent<Element, Event>>(...eventHandlers: readonly (((event: T) => void) | undefined)[]) => (event: T) => void;
