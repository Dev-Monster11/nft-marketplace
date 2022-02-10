import { WebRtcPlayerHook } from './WebRtcPlayerHook';
interface WebRtcPlayerOptions {
    videoContainer: HTMLElement;
    peerConnectionOptions: WebRtcConnectionOption;
    startVideoMuted?: boolean;
    autoPlayAudio?: boolean;
    useMic?: boolean;
    channelLabel?: string;
}
interface WebRtcConnectionOption extends RTCConfiguration {
    sdpSemantics?: any;
    offerExtmapAllowMixed?: any;
    offerToReceiveAudio?: boolean;
    offerToReceiveVideo?: boolean;
    voiceActivityDetection?: boolean;
}
export declare class WebRtcPlayer extends WebRtcPlayerHook {
    private options;
    private rtcConnection;
    private rtcDataChannel;
    private videoContainer;
    video: HTMLVideoElement;
    private audios;
    private dataChannelOptions;
    constructor(options: WebRtcPlayerOptions);
    setupWrbRtcPlayer(): Promise<void>;
    handleReceiveAnswer(answer: any): void;
    handleCandidateFromServer(iceCandidate: RTCIceCandidateInit): void;
    startPlay(): void;
    private setupTransceivers;
    private setupPeerConnection;
    private setupDataChannel;
    private createOffer;
    private onTrack;
    private onIceCandidate;
    private setUpVideo;
    send(data: ArrayBuffer): void;
}
export {};
