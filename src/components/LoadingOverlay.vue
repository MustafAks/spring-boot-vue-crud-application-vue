<template>
    <div v-if="show" class="loading-overlay" :class="{ 'loading-overlay--fullscreen': fullscreen, 'loading-overlay--inline': !fullscreen }">
        <div class="loading-spinner">
            <div class="loading-icon">
                <svg viewBox="0 0 64 64" width="64" height="64" class="bounce-icon">
                    <rect x="8" y="8" width="48" height="48" rx="4" fill="#ec1b24" opacity="0.1"/>
                    <rect x="14" y="16" width="36" height="4" rx="2" fill="#ec1b24"/>
                    <rect x="14" y="24" width="28" height="2" rx="1" fill="#ccc"/>
                    <rect x="14" y="30" width="32" height="2" rx="1" fill="#ccc"/>
                    <rect x="14" y="36" width="20" height="2" rx="1" fill="#ccc"/>
                    <rect x="14" y="42" width="26" height="2" rx="1" fill="#ccc"/>
                    <rect x="14" y="48" width="18" height="2" rx="1" fill="#ccc"/>
                </svg>
            </div>
            <div class="dots-loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p class="loading-text">{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingOverlay',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: 'Yükleniyor...'
        },
        fullscreen: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped>
    .loading-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.9);
    }

    .loading-overlay--fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
    }

    .loading-overlay--inline {
        min-height: 400px;
        width: 100%;
    }

    .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .loading-icon {
        margin-bottom: 10px;
    }

    .bounce-icon {
        animation: float 2s ease-in-out infinite;
    }

    .dots-loader {
        display: flex;
        margin-bottom: 10px;
    }

    .dots-loader span {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 3px;
        border-radius: 50%;
        background: #ec1b24;
        animation: bounce 0.6s infinite alternate;
    }

    .dots-loader span:nth-child(1) {
        animation-delay: 0s;
    }

    .dots-loader span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .dots-loader span:nth-child(3) {
        animation-delay: 0.4s;
    }

    .loading-text {
        margin-top: 15px;
        font-size: 1.1rem;
        color: #555;
        font-weight: 500;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    @keyframes bounce {
        to {
            transform: translateY(-10px);
            opacity: 0.7;
        }
    }
</style>

