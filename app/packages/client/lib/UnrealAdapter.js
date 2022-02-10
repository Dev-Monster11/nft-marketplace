"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnrealAdapter = exports.BusinessMessageType = void 0;
/* eslint-disable @typescript-eslint/ban-ts-ignore */
const WebRtcPlayer_1 = require("./WebRtcPlayer");
const UnrealAdapterHook_1 = require("./UnrealAdapterHook");
const WS_OPEN_STATE = 1;
const ToClientMessageType = {
    QualityControlOwnership: 0,
    Response: 1,
    Command: 2,
    FreezeFrame: 3,
    UnfreezeFrame: 4,
    VideoEncoderAvgQP: 5,
    LatencyTest: 6,
    InitialSettings: 7,
};
const MessageType = {
    /**********************************************************************/
    /*
     * Control Messages. Range = 0..49.
     */
    IFrameRequest: 0,
    RequestQualityControl: 1,
    MaxFpsRequest: 2,
    AverageBitrateRequest: 3,
    StartStreaming: 4,
    StopStreaming: 5,
    LatencyTest: 6,
    RequestInitialSettings: 7,
    /**********************************************************************/
    /*
     * Input Messages. Range = 50..89.
     */
    // Generic Input Messages. Range = 50..59.
    UIInteraction: 50,
    Command: 51,
    // Keyboard Input Message. Range = 60..69.
    KeyDown: 60,
    KeyUp: 61,
    KeyPress: 62,
    // Mouse Input Messages. Range = 70..79.
    MouseEnter: 70,
    MouseLeave: 71,
    MouseDown: 72,
    MouseUp: 73,
    MouseMove: 74,
    MouseWheel: 75,
    // Touch Input Messages. Range = 80..89.
    TouchStart: 80,
    TouchEnd: 81,
    TouchMove: 82,
    // Gamepad Input Messages. Range = 90..99
    GamepadButtonPressed: 90,
    GamepadButtonReleased: 91,
    GamepadAnalog: 92,
    /**************************************************************************/
};
var BusinessMessageType;
(function (BusinessMessageType) {
    BusinessMessageType["init"] = "0";
})(BusinessMessageType = exports.BusinessMessageType || (exports.BusinessMessageType = {}));
class UnrealAdapter extends UnrealAdapterHook_1.UnrealAdapterHook {
    constructor(options) {
        super();
        this.unrealAdapterOption = options;
    }
    load() {
        this.ws = new WebSocket(this.unrealAdapterOption.useSSL
            ? 'wss://'
            : 'ws://' + this.unrealAdapterOption.host + ':' + this.unrealAdapterOption.port);
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'answer':
                    this.player.handleReceiveAnswer(data);
                    if (this.onAnswer) {
                        this.onAnswer(data);
                    }
                    break;
                case 'config':
                    if (data.peerConnectionOptions) {
                        this.onPlayerConfig(data.peerConnectionOptions);
                    }
                    break;
                case 'iceCandidate':
                    if (this.player && data.candidate) {
                        this.player.handleCandidateFromServer(data.candidate);
                    }
                    if (this.onIceCandidate) {
                        this.onIceCandidate(data.candidate);
                    }
                    break;
                case 'playerCount':
                default:
            }
        };
        window.addEventListener('orientationchange', () => {
            this.onOrientationChange();
        });
    }
    resizeVideo() {
        if (this.unrealAdapterOption.matchViewPort) {
            const descriptor = {
                Console: 'setres ' +
                    this.unrealAdapterOption.container.clientWidth +
                    'x' +
                    this.unrealAdapterOption.container.clientHeight,
            };
            this.emitDescriptor(MessageType.UIInteraction, descriptor);
        }
    }
    onOrientationChange() {
        if (this.videoResizeTimeout) {
            clearTimeout(this.videoResizeTimeout);
            this.videoResizeTimeout = setTimeout(() => {
                this.resizeVideo();
            }, 500);
        }
    }
    onPlayerConfig(peerConnectionOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            this.player = new WebRtcPlayer_1.WebRtcPlayer({
                peerConnectionOptions,
                videoContainer: this.unrealAdapterOption.container,
                useMic: this.unrealAdapterOption.useMic ? this.unrealAdapterOption.useMic : false,
            });
            this.player.onWebRtcOffer = (o) => {
                if (this.ws && this.ws.readyState === WS_OPEN_STATE) {
                    const offerStr = JSON.stringify(o);
                    this.ws.send(offerStr);
                }
            };
            this.player.onWebRtcCandidate = (o) => {
                if (this.ws && this.ws.readyState === WS_OPEN_STATE) {
                    this.ws.send(JSON.stringify({
                        type: 'iceCandidate',
                        candidate: o,
                    }));
                }
            };
            this.player.onVideoInitialised = () => {
                // console.log('onVideoInitialised');
            };
            this.player.onDataChannelConnected = () => {
                if (this.ws && this.ws.readyState === WS_OPEN_STATE) {
                    if (this.player.video && this.player.video.srcObject && this.player.onVideoInitialised) {
                        this.player.onVideoInitialised();
                    }
                }
            };
            this.player.onDataChannelMessage = (o) => {
                const view = new Uint8Array(o);
                const res = new TextDecoder('utf-16').decode(o.slice(1));
                if (view[0] === ToClientMessageType.Response) {
                    if (this.onMessage) {
                        try {
                            this.onMessage(JSON.parse(res));
                        }
                        catch (_a) {
                            this.onMessage(undefined);
                        }
                    }
                }
            };
            yield this.player.setupWrbRtcPlayer();
            if (this.onConfig) {
                this.onConfig(peerConnectionOptions);
            }
        });
    }
    emitUIInteraction(descriptor, type) {
        Object.assign(descriptor, { _message: 'true', _type: type });
        console.log(descriptor);
        this.emitDescriptor(MessageType.UIInteraction, descriptor);
    }
    emitDescriptor(messageType, descriptor) {
        // Convert the descriptor object into a JSON string.
        const descriptorAsString = JSON.stringify(descriptor);
        // Add the UTF-16 JSON string to the array byte buffer, going two bytes at
        // a time.
        const data = new DataView(new ArrayBuffer(1 + 2 + 2 * descriptorAsString.length));
        let byteIdx = 0;
        data.setUint8(byteIdx, messageType);
        byteIdx++;
        data.setUint16(byteIdx, descriptorAsString.length, true);
        byteIdx += 2;
        for (let i = 0; i < descriptorAsString.length; i++) {
            data.setUint16(byteIdx, descriptorAsString.charCodeAt(i), true);
            byteIdx += 2;
        }
        this.sendInputData(data.buffer);
    }
    sendInputData(data) {
        if (this.player) {
            this.player.send(data);
        }
    }
}
exports.UnrealAdapter = UnrealAdapter;
//# sourceMappingURL=UnrealAdapter.js.map