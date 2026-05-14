<template>
    <div :class="['global-player', { 'global-player-mini': mini }]">
        <!-- YouTube iframe - always in DOM, never recreated -->
        <div :class="mini ? 'gp-iframe-hidden' : 'gp-iframe-visible'">
            <div :id="playerId" class="gp-iframe"></div>
            <div v-if="!mini && !started" class="gp-play-overlay" @click="togglePlay">
                <div class="gp-play-button">
                    <b-icon icon="play-fill"></b-icon>
                </div>
            </div>
        </div>

        <!-- Full mode controls (MainPage) -->
        <div class="gp-full-controls" v-if="!mini && started">
            <b-button size="sm" variant="outline-danger" @click="prevVideo" :disabled="videoIds.length <= 1">
                <b-icon icon="skip-backward-fill"></b-icon>
            </b-button>
            <b-button size="sm" variant="outline-danger" @click="togglePlay">
                <b-icon :icon="isPlaying ? 'pause-fill' : 'play-fill'"></b-icon>
            </b-button>
            <b-button size="sm" variant="outline-danger" @click="nextVideo" :disabled="videoIds.length <= 1">
                <b-icon icon="skip-forward-fill"></b-icon>
            </b-button>
        </div>

        <!-- Mini mode bar (diğer sayfalar) -->
        <div class="gp-mini-bar" v-if="mini">
            <div class="gp-mini-progress" @click="seekTo($event)">
                <div class="gp-mini-progress-fill" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div class="gp-mini-content">
                <div class="gp-mini-left">
                    <b-icon icon="music-note-beamed" variant="danger" font-scale="1.2"></b-icon>
                    <span class="gp-mini-title">{{ videoTitle || 'Müzik Çalar' }}</span>
                    <span class="gp-mini-time">{{ currentTimeFormatted }} / {{ durationFormatted }}</span>
                </div>
                <div class="gp-mini-center">
                    <b-button size="sm" variant="outline-light" @click="prevVideo" :disabled="videoIds.length <= 1" class="gp-mini-btn">
                        <b-icon icon="skip-backward-fill"></b-icon>
                    </b-button>
                    <b-button size="sm" variant="light" @click="togglePlay" class="gp-mini-play-btn">
                        <b-icon :icon="isPlaying ? 'pause-fill' : 'play-fill'"></b-icon>
                    </b-button>
                    <b-button size="sm" variant="outline-light" @click="nextVideo" :disabled="videoIds.length <= 1" class="gp-mini-btn">
                        <b-icon icon="skip-forward-fill"></b-icon>
                    </b-button>
                </div>
                <div class="gp-mini-right">
                    <b-button size="sm" variant="outline-light" @click="$emit('close')" class="gp-mini-close">
                        <b-icon icon="x"></b-icon>
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let apiLoadPromise = null;

function loadYouTubeAPI() {
    if (apiLoadPromise) return apiLoadPromise;

    apiLoadPromise = new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve(window.YT);
            return;
        }

        const previousCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (previousCallback) previousCallback();
            resolve(window.YT);
        };

        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        }
    });

    return apiLoadPromise;
}

export default {
    name: 'GlobalPlayer',
    props: {
        videoIds: {
            type: Array,
            default: () => []
        },
        mini: {
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            playerId: 'global-yt-' + Math.random().toString(36).substr(2, 9),
            player: null,
            currentIndex: 0,
            started: false,
            isPlaying: false,
            videoTitle: '',
            currentTime: 0,
            duration: 0,
            progressTimer: null,
            history: []
        };
    },
    computed: {
        progressPercent() {
            if (this.duration <= 0) return 0;
            return (this.currentTime / this.duration) * 100;
        },
        currentTimeFormatted() {
            return this.formatTime(this.currentTime);
        },
        durationFormatted() {
            return this.formatTime(this.duration);
        }
    },
    async mounted() {
        if (this.videoIds.length === 0) return;
        const YT = await loadYouTubeAPI();
        this.initPlayer(YT);
    },
    beforeDestroy() {
        this.stopTimer();
        if (this.player && typeof this.player.destroy === 'function') {
            this.player.destroy();
        }
    },
    methods: {
        initPlayer(YT) {
            this.currentIndex = Math.floor(Math.random() * this.videoIds.length);
            this.player = new YT.Player(this.playerId, {
                width: '100%',
                height: '100%',
                videoId: this.videoIds[this.currentIndex],
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    playsinline: 1
                },
                events: {
                    onReady: this.onReady,
                    onStateChange: this.onStateChange
                }
            });
        },

        onReady() {
            this.updateTitle();
        },

        onStateChange(event) {
            const state = event.data;
            if (state === 1) {
                this.isPlaying = true;
                this.started = true;
                this.updateTitle();
                this.updateDuration();
                this.startTimer();
            }
            if (state === 2) {
                this.isPlaying = false;
                this.stopTimer();
            }
            if (state === 0) this.playNext();
        },

        updateTitle() {
            try {
                if (this.player && typeof this.player.getVideoData === 'function') {
                    const data = this.player.getVideoData();
                    if (data && data.title) {
                        this.videoTitle = data.title;
                    }
                }
            } catch (e) { /* ignore */ }
        },

        togglePlay() {
            if (!this.player) return;
            if (this.isPlaying) {
                this.player.pauseVideo();
            } else {
                this.started = true;
                this.player.playVideo();
            }
        },

        playNext() {
            if (this.videoIds.length <= 1) return;
            this.history.push(this.currentIndex);
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * this.videoIds.length);
            } while (nextIndex === this.currentIndex);
            this.currentIndex = nextIndex;
            this.player.loadVideoById(this.videoIds[this.currentIndex]);
        },

        nextVideo() { this.playNext(); },

        prevVideo() {
            if (this.history.length > 0) {
                this.currentIndex = this.history.pop();
            } else {
                return;
            }
            this.player.loadVideoById(this.videoIds[this.currentIndex]);
        },

        pauseVideo() {
            if (this.player && this.isPlaying) {
                this.player.pauseVideo();
            }
        },

        startTimer() {
            this.stopTimer();
            this.progressTimer = setInterval(() => {
                this.updateCurrentTime();
            }, 500);
        },

        stopTimer() {
            if (this.progressTimer) {
                clearInterval(this.progressTimer);
                this.progressTimer = null;
            }
        },

        updateCurrentTime() {
            try {
                if (this.player && typeof this.player.getCurrentTime === 'function') {
                    this.currentTime = this.player.getCurrentTime();
                }
            } catch (e) { /* ignore */ }
        },

        updateDuration() {
            try {
                if (this.player && typeof this.player.getDuration === 'function') {
                    this.duration = this.player.getDuration();
                }
            } catch (e) { /* ignore */ }
        },

        seekTo(event) {
            if (!this.player || !this.duration) return;
            const bar = event.currentTarget;
            const rect = bar.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            const seekTime = percent * this.duration;
            this.player.seekTo(seekTime, true);
            this.currentTime = seekTime;
        },

        formatTime(seconds) {
            if (!seconds || isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return mins + ':' + (secs < 10 ? '0' : '') + secs;
        }
    }
};
</script>

<style scoped>
    /* ===== FULL MODE (MainPage) ===== */
    .global-player {
        background: #fff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border: 1px solid #eee;
    }

    .gp-iframe-visible {
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9 fallback for older browsers */
        aspect-ratio: 16 / 9;
        border-radius: 8px;
        overflow: hidden;
        background: #000;
    }

    .gp-iframe { width: 100%; height: 100%; }

    .gp-play-overlay {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.65);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: background 0.2s;
    }

    .gp-play-overlay:hover { background: rgba(0, 0, 0, 0.75); }

    .gp-play-button {
        width: 70px; height: 70px;
        border-radius: 50%;
        background: #ec1b24;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 2.2rem;
        box-shadow: 0 4px 16px rgba(236, 27, 36, 0.4);
        transition: transform 0.2s;
    }

    .gp-play-overlay:hover .gp-play-button { transform: scale(1.1); }

    .gp-full-controls {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 12px;
    }

    /* ===== MINI MODE ===== */
    .global-player-mini {
        background: #1a1a1a;
        border-radius: 0;
        padding: 0;
        box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.3);
        border: none;
        border-top: 2px solid #ec1b24;
    }

    .gp-iframe-hidden {
        width: 1px;
        height: 1px;
        overflow: hidden;
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    .gp-mini-bar {
        display: flex;
        flex-direction: column;
        padding: 0;
        min-height: 52px;
    }

    .gp-mini-progress {
        width: 100%;
        height: 3px;
        background: #333;
        cursor: pointer;
        flex-shrink: 0;
        transition: height 0.15s ease;
    }

    .gp-mini-progress:hover {
        height: 6px;
    }

    .gp-mini-progress-fill {
        height: 100%;
        background: #ec1b24;
        transition: width 0.3s linear;
        border-radius: 0 2px 2px 0;
    }

    .gp-mini-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 16px;
        flex: 1;
    }

    .gp-mini-left {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
    }

    .gp-mini-title {
        color: #ccc;
        font-size: 0.85rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .gp-mini-time {
        color: #777;
        font-size: 0.75rem;
        font-weight: 400;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .gp-mini-center {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .gp-mini-btn {
        color: #ccc;
        border-color: #555;
        background: transparent;
        width: 32px; height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .gp-mini-btn:hover {
        background: #333;
        border-color: #888;
        color: #fff;
    }

    .gp-mini-play-btn {
        background: #ec1b24;
        border-color: #ec1b24;
        color: #fff;
        width: 36px; height: 36px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 1.1rem;
    }

    .gp-mini-play-btn:hover {
        background: #c0151d;
        border-color: #c0151d;
    }

    .gp-mini-right {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
    }

    .gp-mini-close {
        color: #999;
        border: none;
        background: transparent;
        padding: 4px;
    }

    .gp-mini-close:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
    }

    @media only screen and (max-width: 768px) {
        .gp-mini-title { display: none; }
        .gp-mini-time { display: none; }
        .gp-mini-content { padding: 6px 12px; }
    }
</style>

<style>
    /* Unscoped: YT.Player replaces div with iframe */
    .gp-iframe-visible iframe,
    .gp-iframe-visible > div {
        width: 100% !important;
        height: 100% !important;
        position: absolute;
        top: 0;
        left: 0;
    }

    .gp-iframe-hidden iframe,
    .gp-iframe-hidden > div {
        width: 1px !important;
        height: 1px !important;
    }
</style>
