import { WebRtcPlayer } from './WebRtcPlayer';
import { UnrealAdapterHook } from './UnrealAdapterHook';
export interface UnrealAdapterOptions {
    container: HTMLElement;
    host: string;
    port: number;
    useSSL?: boolean;
    useMic?: boolean;
    matchViewPort?: boolean;
}
export declare enum BusinessMessageType {
    init = "0"
}
export declare class UnrealAdapter extends UnrealAdapterHook {
    private unrealAdapterOption;
    player: WebRtcPlayer;
    private ws;
    private videoResizeTimeout;
    constructor(options: UnrealAdapterOptions);
    load(): void;
    resizeVideo(): void;
    private onOrientationChange;
    private onPlayerConfig;
    emitUIInteraction(descriptor: any, type: string): void;
    emitDescriptor(messageType: number, descriptor: any): void;
    sendInputData(data: ArrayBuffer): void;
}
