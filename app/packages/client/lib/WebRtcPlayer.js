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
exports.WebRtcPlayer = void 0;
const WebRtcPlayerHook_1 = require("./WebRtcPlayerHook");
const DefaultWebRtcConnectionOption = {
    sdpSemantics: 'unified-plan',
    offerExtmapAllowMixed: false,
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
    voiceActivityDetection: false,
};
// @ts-ignore
class WebRtcPlayer extends WebRtcPlayerHook_1.WebRtcPlayerHook {
    constructor(options) {
        super();
        this.audios = [];
        this.dataChannelOptions = { ordered: true };
        this.options = options;
        this.options.peerConnectionOptions = Object.assign(this.options.peerConnectionOptions, DefaultWebRtcConnectionOption);
        this.rtcConnection = new RTCPeerConnection(this.options.peerConnectionOptions);
        this.videoContainer = this.options.videoContainer;
        this.video = document.createElement('video');
    }
    setupWrbRtcPlayer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setUpVideo();
            yield this.setupTransceivers();
            this.setupPeerConnection();
            this.setupDataChannel();
            this.createOffer();
        });
    }
    handleReceiveAnswer(answer) {
        const answerDesc = new RTCSessionDescription(answer);
        this.rtcConnection.setRemoteDescription(answerDesc);
    }
    handleCandidateFromServer(iceCandidate) {
        const candidate = new RTCIceCandidate(iceCandidate);
        this.rtcConnection.addIceCandidate(candidate).then(() => {
            // console.log('ICE candidate successfully added');
        });
    }
    startPlay() {
        this.video.play();
        this.audios.forEach((audio) => audio.play());
    }
    setupTransceivers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.rtcConnection.addTransceiver('video', { direction: 'recvonly' });
            if (!this.options.useMic) {
                this.rtcConnection.addTransceiver('audio', { direction: 'recvonly' });
            }
            else {
                const audioSendOptions = {
                    autoGainControl: false,
                    channelCount: 1,
                    echoCancellation: false,
                    latency: 0,
                    noiseSuppression: false,
                    sampleRate: 16000,
                    volume: 1.0,
                };
                // @ts-ignore
                // console.log('GetUserMedia');
                // console.log(navigator.mediaDevices);
                let stream;
                if (navigator.mediaDevices) {
                    stream = yield navigator.mediaDevices.getUserMedia({ video: false, audio: audioSendOptions });
                }
                else {
                    // @ts-ignore
                    const cordova = window.cordova;
                    if (cordova && cordova.plugins && cordova.plugins.iosrtc) {
                        // console.log(cordova);
                        cordova.plugins.iosrtc.registerGlobals();
                        cordova.plugins.iosrtc.debug.enable('*', true);
                        stream = yield cordova.plugins.iosrtc.getUserMedia({ audio: true, video: false });
                    }
                }
                if (stream) {
                    // console.log(stream.getTracks());
                    stream.getTracks().forEach((track) => {
                        if (track.kind && track.kind === 'audio') {
                            this.rtcConnection.addTransceiver(track, { direction: 'sendrecv' });
                        }
                    });
                }
                else {
                    this.rtcConnection.addTransceiver('audio', { direction: 'recvonly' });
                }
            }
        });
    }
    setupPeerConnection() {
        this.rtcConnection.ontrack = (e) => {
            this.onTrack(e);
        };
        this.rtcConnection.onicecandidate = (e) => {
            this.onIceCandidate(e);
        };
    }
    setupDataChannel() {
        this.options.channelLabel = this.options.channelLabel ? this.options.channelLabel : 'cirrus';
        this.rtcDataChannel = this.rtcConnection.createDataChannel(this.options.channelLabel ? this.options.channelLabel : 'cirrus', this.dataChannelOptions);
        this.rtcDataChannel.binaryType = 'arraybuffer';
        this.rtcDataChannel.onopen = () => {
            if (this.onDataChannelConnected) {
                this.onDataChannelConnected();
            }
        };
        this.rtcDataChannel.onclose = () => {
            // console.log(`data channel (${this.options.channelLabel}) closed`)
        };
        this.rtcDataChannel.onmessage = (e) => {
            if (this.onDataChannelMessage) {
                this.onDataChannelMessage(e.data);
            }
        };
    }
    createOffer() {
        return __awaiter(this, void 0, void 0, function* () {
            const offer = yield this.rtcConnection.createOffer(this.options.peerConnectionOptions);
            if (!offer) {
                return;
            }
            if (offer && offer.sdp) {
                offer.sdp = offer.sdp.replace('useinbandfec=1', 'useinbandfec=1;stereo=1;sprop-maxcapturerate=48000');
            }
            this.rtcConnection.setLocalDescription(offer);
            if (this.onWebRtcOffer) {
                this.onWebRtcOffer(offer);
            }
        });
    }
    onTrack(e) {
        const stream = e.streams[0];
        if (e.track.kind === 'audio') {
            if (this.video.srcObject === stream) {
                return;
            }
            else if (this.video.srcObject && this.video.srcObject !== stream) {
                const audioElem = document.createElement('Audio');
                audioElem.srcObject = stream;
                if (this.options.autoPlayAudio) {
                    audioElem.play();
                }
                this.audios.push(audioElem);
            }
            return;
        }
        else if (e.track.kind === 'video' && this.video.srcObject !== stream) {
            this.video.srcObject = stream;
            if (this.options.autoPlayAudio) {
                this.video.play();
            }
            return;
        }
    }
    onIceCandidate(e) {
        if (e.candidate && e.candidate.candidate && this.onWebRtcCandidate) {
            this.onWebRtcCandidate(e.candidate);
        }
    }
    setUpVideo() {
        this.video.id = 'lark-webrtc-video';
        this.video.style.width = '100%';
        this.video.style.height = '100%';
        this.video.style.display = 'block';
        this.video.style.objectFit = 'fill';
        this.video.playsInline = true;
        // this.video.disablePictureInPicture = true;
        this.video.muted = this.options.startVideoMuted ? this.options.startVideoMuted : false;
        this.videoContainer.appendChild(this.video);
        this.video.addEventListener('loadedmetadata', () => {
            if (this.onVideoInitialised) {
                this.onVideoInitialised();
            }
        }, true);
    }
    send(data) {
        if (this.rtcDataChannel && this.rtcDataChannel.readyState === 'open') {
            this.rtcDataChannel.send(data);
        }
    }
}
exports.WebRtcPlayer = WebRtcPlayer;
//# sourceMappingURL=WebRtcPlayer.js.map