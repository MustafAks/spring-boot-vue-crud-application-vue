<template>
    <div class="yt-player-wrapper">
        <div class="yt-player-frame">
            <div :id="playerId" class="yt-iframe"></div>

            <div v-if="!started" class="yt-play-overlay" @click="startPlayback">
                <div class="yt-play-button">
                    <b-icon icon="play-fill"></b-icon>
                </div>
            </div>
        </div>

        <div class="yt-player-controls" v-if="started">
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

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
    });

    return apiLoadPromise;
}

export default {
    name: 'YouTubePlayer',
    props: {
        videoIds: {
            type: Array,
            default: () => []
        },
        loop: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            playerId: 'yt-player-' + Math.random().toString(36).substr(2, 9),
            player: null,
            currentIndex: 0,
            started: false,
            isPlaying: false
        };
    },
    async mounted() {
        if (this.videoIds.length === 0) return;
        const YT = await loadYouTubeAPI();
        this.initPlayer(YT);
    },
    beforeDestroy() {
        if (this.player && typeof this.player.destroy === 'function') {
            this.player.destroy();
        }
    },
    methods: {
        initPlayer(YT) {
            this.player = new YT.Player(this.playerId, {
                width: '100%',
                height: '100%',
                videoId: this.videoIds[0],
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                },
                events: {
                    onStateChange: this.onStateChange
                }
            });
        },

        onStateChange(event) {
            const state = event.data;
            // 1 = playing, 2 = paused, 0 = ended
            if (state === 1) {
                this.isPlaying = true;
                this.syncToStore();
            }
            if (state === 2) {
                this.isPlaying = false;
                this.syncToStore();
            }
            if (state === 0) this.playNext();
        },

        startPlayback() {
            this.started = true;
            if (this.player && typeof this.player.playVideo === 'function') {
                this.player.playVideo();
            }
            this.syncToStore();
        },

        playNext() {
            if (this.currentIndex < this.videoIds.length - 1) {
                this.currentIndex++;
            } else if (this.loop) {
                this.currentIndex = 0;
            } else {
                return;
            }
            this.player.loadVideoById(this.videoIds[this.currentIndex]);
            this.syncToStore();
        },

        nextVideo() { this.playNext(); },

        prevVideo() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else if (this.loop) {
                this.currentIndex = this.videoIds.length - 1;
            } else {
                return;
            }
            this.player.loadVideoById(this.videoIds[this.currentIndex]);
            this.syncToStore();
        },

        togglePlay() {
            if (!this.player) return;
            if (this.isPlaying) {
                this.player.pauseVideo();
            } else {
                this.player.playVideo();
            }
        },

        syncToStore() {
            let currentTime = 0;
            try {
                if (this.player && typeof this.player.getCurrentTime === 'function') {
                    currentTime = this.player.getCurrentTime();
                }
            } catch (e) { /* ignore */ }
            this.$store.commit('updatePlayerState', {
                started: this.started,
                currentIndex: this.currentIndex,
                currentTime: currentTime,
                isPlaying: this.isPlaying
            });
        },

        getPlayerTime() {
            try {
                if (this.player && typeof this.player.getCurrentTime === 'function') {
                    return this.player.getCurrentTime();
                }
            } catch (e) { /* ignore */ }
            return 0;
        },

        pauseVideo() {
            if (this.player && typeof this.player.pauseVideo === 'function') {
                this.player.pauseVideo();
            }
        },

        resumeFromState() {
            const ps = this.$store.state.playerState;
            if (ps.started) {
                this.started = true;
                this.currentIndex = ps.currentIndex;
                if (this.player) {
                    this.player.loadVideoById({
                        videoId: this.videoIds[ps.currentIndex],
                        startSeconds: ps.currentTime
                    });
                    if (!ps.isPlaying) {
                        // Kısa gecikme ile durdur (loadVideoById otomatik başlatıyor)
                        setTimeout(() => this.player.pauseVideo(), 500);
                    }
                }
            }
        }
    },
    watch: {
        videoIds(newVal) {
            this.currentIndex = 0;
            if (this.player && newVal.length > 0) {
                this.player.loadVideoById(newVal[0]);
            }
        }
    }
};
</script>

<style scoped>
    .yt-player-wrapper {
        background: #fff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border: 1px solid #eee;
    }

    .yt-player-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        font-weight: 600;
        color: #333;
    }

    .yt-player-title { flex: 1; }

    .yt-player-counter {
        font-size: 0.8rem;
        color: #999;
        font-weight: 500;
        background: #f5f5f5;
        padding: 2px 10px;
        border-radius: 10px;
    }

    .yt-player-frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 8px;
        overflow: hidden;
        background: #000;
    }

    .yt-iframe { width: 100%; height: 100%; }

    .yt-play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.65);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: background 0.2s;
    }

    .yt-play-overlay:hover { background: rgba(0, 0, 0, 0.75); }

    .yt-play-button {
        width: 70px;
        height: 70px;
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

    .yt-play-overlay:hover .yt-play-button { transform: scale(1.1); }

    .yt-play-text {
        color: #fff;
        margin-top: 12px;
        font-weight: 500;
        font-size: 0.95rem;
    }

    .yt-player-controls {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 12px;
    }
</style>

<style>
    /* Unscoped: YT.Player div'i iframe ile değiştirdiğinde scoped class kayboluyor */
    .yt-player-frame iframe,
    .yt-player-frame > div {
        width: 100% !important;
        height: 100% !important;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>



