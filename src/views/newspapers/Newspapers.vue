<template>
    <div class="newspapers-container">
        <!-- Loading Overlay (initial) -->
        <loading-overlay :show="initialLoading" :fullscreen="false" />

        <!-- Content -->
        <div v-if="!initialLoading">
            <h2 class="page-title">Gazeteler</h2>

            <!-- Year Pills -->
            <div class="year-pills">
                <b-button
                    v-for="year in years"
                    :key="year"
                    :variant="selectedYear === year ? 'danger' : 'outline-danger'"
                    class="year-pill"
                    @click="onChange(year)"
                >
                    {{ year }}
                </b-button>
            </div>

            <!-- Loading for year change -->
            <loading-overlay :show="yearLoading" :fullscreen="false" />

            <!-- Empty State -->
            <div v-if="!yearLoading && newspapers.length === 0" class="empty-state">
                <b-icon icon="journal-x" font-scale="3"></b-icon>
                <p>Bu yıla ait gazete bulunmamaktadır</p>
            </div>

            <!-- Newspaper Cards Grid -->
            <b-row v-if="!yearLoading && newspapers.length > 0">
                <b-col cols="12" md="4" v-for="newspaper in newspapers" :key="newspaper.id" class="mb-4">
                    <div class="newspaper-card" @click="openPages(newspaper)">
                        <div class="newspaper-card-icon">
                            <b-icon icon="newspaper" font-scale="2.5" variant="danger"></b-icon>
                        </div>
                        <h5 class="newspaper-card-title">{{ newspaper.title }}</h5>
                    </div>
                </b-col>
            </b-row>
        </div>


        <!-- PDF Viewer Fullscreen Overlay -->
        <div v-if="pdfViewerOpen" class="pdf-viewer-overlay">
            <div class="pdf-toolbar">
                <div class="pdf-toolbar-left">
                    <span class="pdf-title">{{ selectedNewspaperTitle }}</span>
                </div>
                <div class="pdf-toolbar-center" v-if="pages.length > 0">
                    <b-button variant="light" size="sm" :disabled="pdfLoading || currentPageIndex <= 0" @click="prevPage" class="pdf-nav-btn">
                        <b-icon icon="chevron-left"></b-icon>
                    </b-button>
                    <span class="pdf-page-info">
                        {{ currentPageNumber }}. Sayfa / {{ pages.length }} Sayfa
                    </span>
                    <b-button variant="light" size="sm" :disabled="pdfLoading || currentPageIndex >= pages.length - 1" @click="nextPage" class="pdf-nav-btn">
                        <b-icon icon="chevron-right"></b-icon>
                    </b-button>
                </div>
                <div class="pdf-toolbar-right">
                    <b-button variant="outline-danger" size="sm" @click="closePdfViewer" class="pdf-close-btn">
                        <b-icon icon="x" font-scale="1.3"></b-icon>
                    </b-button>
                </div>
            </div>
            <div class="pdf-content"
                 ref="pdfContent"
                 @contextmenu.prevent
                 @touchstart="onTouchStart"
                 @touchend="onTouchEnd"
            >
                <loading-overlay :show="pdfLoading" :fullscreen="false" message="Sayfa yükleniyor..." />
                <iframe
                    v-if="pdfUrl"
                    v-show="!pdfLoading"
                    :key="pdfUrl"
                    :src="pdfUrl + '#toolbar=0'"
                    class="pdf-iframe"
                    frameborder="0"
                    @load="onIframeLoad"
                ></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import NewspaperService from "../../service/NewspaperService";
import LoadingOverlay from "../../components/LoadingOverlay";

export default {
    name: 'Newspapers',
    components: { LoadingOverlay },
    data() {
        return {
            years: [],
            newspapers: [],
            pages: [],
            initialLoading: true,
            yearLoading: false,
            selectedYear: null,
            selectedNewspaperTitle: '',
            pdfViewerOpen: false,
            pdfLoading: false,
            pdfUrl: null,
            currentPageIndex: 0,
            touchStartX: 0,
            touchStartY: 0
        }
    },

    computed: {
        currentPageNumber() {
            if (this.pages.length > 0 && this.currentPageIndex < this.pages.length) {
                return this.pages[this.currentPageIndex].pageNumber;
            }
            return 1;
        }
    },

    methods: {
        async getYears() {
            try {
                this.initialLoading = true;
                this.years = await NewspaperService.getYears();
                if (this.years && this.years.length > 0) {
                    this.selectedYear = this.years[0];
                    await this.getNewspapersByYear(this.years[0]);
                }
            } finally {
                this.initialLoading = false;
            }
        },

        async getNewspapersByYear(year) {
            this.newspapers = await NewspaperService.getNewspapersByYear(year);
        },

        async onChange(year) {
            this.selectedYear = year;
            this.yearLoading = true;
            try {
                await this.getNewspapersByYear(year);
            } finally {
                this.yearLoading = false;
            }
        },

        async openPages(newspaper) {
            this.selectedNewspaperTitle = newspaper.title;
            this.pages = [];
            this.currentPageIndex = 0;
            this.pdfViewerOpen = true;
            this.pdfLoading = true;
            document.body.style.overflow = 'hidden';
            this.hideFooter(true);
            try {
                this.pages = await NewspaperService.getPagesByNewspaperId(newspaper.id, 'Asc');
                if (this.pages.length > 0) {
                    this.loadPdf(this.pages[0].filePath);
                } else {
                    this.pdfLoading = false;
                }
            } catch (e) {
                this.pdfLoading = false;
            }
        },

        closePdfViewer() {
            this.pdfUrl = null;
            this.$nextTick(() => {
                this.pdfViewerOpen = false;
                this.pages = [];
                document.body.style.overflow = '';
                this.hideFooter(false);
            });
        },

        loadPdf(filePath) {
            const baseURL = 'https://hasretkemaliye.com';
            this.pdfLoading = true;
            // Cache-buster ile tarayıcı cache sorununu önle
            const cacheBuster = '?t=' + Date.now();
            this.pdfUrl = baseURL + filePath + cacheBuster;
        },

        onIframeLoad() {
            this.pdfLoading = false;
        },

        prevPage() {
            if (this.currentPageIndex > 0) {
                this.currentPageIndex--;
                this.loadPdf(this.pages[this.currentPageIndex].filePath);
            }
        },

        nextPage() {
            if (this.currentPageIndex < this.pages.length - 1) {
                this.currentPageIndex++;
                this.loadPdf(this.pages[this.currentPageIndex].filePath);
            }
        },


        handleKeydown(e) {
            if (!this.pdfViewerOpen) return;
            if (e.key === 'Escape') this.closePdfViewer();
            if (e.key === 'ArrowLeft') this.prevPage();
            if (e.key === 'ArrowRight') this.nextPage();
            // Ctrl+S (kaydet/indir) ve Ctrl+P (yazdır) engelle
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
                e.preventDefault();
            }
        },

        hideFooter(hide) {
            const footer = document.getElementById('footer-view');
            const miniPlayer = document.querySelector('.gp-wrapper-mini');
            if (footer) {
                footer.style.display = hide ? 'none' : '';
            }
            if (miniPlayer) {
                miniPlayer.style.bottom = hide ? '0' : '80px';
            }
        },

        onTouchStart(e) {
            if (e.touches.length === 1) {
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }
        },

        onTouchEnd(e) {
            if (e.changedTouches.length === 1) {
                const deltaX = e.changedTouches[0].clientX - this.touchStartX;
                const deltaY = e.changedTouches[0].clientY - this.touchStartY;
                // Sadece yatay hareket yeterince büyükse ve dikey hareketten fazlaysa
                if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
                    if (deltaX < 0) {
                        this.nextPage();
                    } else {
                        this.prevPage();
                    }
                }
            }
        }
    },

    beforeMount() {
        this.getYears();
    },

    mounted() {
        window.addEventListener('keydown', this.handleKeydown);
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeydown);
        this.pdfUrl = null;
        this.hideFooter(false);
        document.body.style.overflow = '';
    }
}
</script>

<style scoped>
    .newspapers-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 20px;
    }

    .page-title {
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
    }

    /* Year Pills */
    .year-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 30px;
    }

    .year-pill {
        border-radius: 20px;
        padding: 6px 18px;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    /* Newspaper Cards */
    .newspaper-card {
        background: #fff;
        border-radius: 12px;
        padding: 30px 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border: 1px solid #eee;
    }

    .newspaper-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(236, 27, 36, 0.15);
        border-color: #ec1b24;
    }

    .newspaper-card-icon {
        margin-bottom: 12px;
    }

    .newspaper-card-title {
        font-weight: 600;
        color: #333;
        margin-bottom: 6px;
    }


    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #999;
    }

    .empty-state p {
        margin-top: 10px;
        font-size: 1rem;
    }


    /* PDF Viewer */
    .pdf-viewer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100% - 55px);
        z-index: 9999;
        background: #fff;
        display: flex;
        flex-direction: column;
        animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .pdf-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background: #ec1b24;
        border-bottom: 1px solid #c0151d;
        flex-shrink: 0;
    }

    .pdf-toolbar-left,
    .pdf-toolbar-center,
    .pdf-toolbar-right {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .pdf-toolbar-left { flex: 1; }
    .pdf-toolbar-right { flex: 1; justify-content: flex-end; }

    .pdf-close-btn {
        font-weight: 500;
        border-color: #fff;
        color: #fff;
        width: 34px;
        height: 34px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .pdf-close-btn:hover {
        background: #fff;
        color: #ec1b24;
    }

    .pdf-title {
        color: #fff;
        font-weight: 500;
        font-size: 0.95rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .pdf-page-info {
        color: #fff;
        font-size: 0.9rem;
        white-space: nowrap;
        font-weight: 500;
    }

    .pdf-content {
        flex: 1;
        display: flex;
        align-items: stretch;
        justify-content: center;
        overflow: hidden;
        background: #f2f3f4;
    }

    .pdf-iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    .pdf-nav-btn {
        color: #ec1b24 !important;
        border-color: #fff !important;
        background: #fff !important;
        font-weight: 600;
        opacity: 1 !important;
        -webkit-appearance: none !important;
        outline: none !important;
        box-shadow: none !important;
    }

    .pdf-nav-btn:focus,
    .pdf-nav-btn:active,
    .pdf-nav-btn:focus:active,
    .pdf-nav-btn.focus {
        color: #ec1b24 !important;
        border-color: #fff !important;
        background: #fff !important;
        opacity: 1 !important;
        outline: none !important;
        box-shadow: none !important;
    }

    .pdf-nav-btn:disabled,
    .pdf-nav-btn[disabled],
    .pdf-nav-btn:disabled:focus,
    .pdf-nav-btn:disabled:active {
        opacity: 0.35 !important;
        background: #ccc !important;
        border-color: #ccc !important;
        color: #777 !important;
        pointer-events: none;
        box-shadow: none !important;
    }

    @media (hover: hover) {
        .pdf-nav-btn:not(:disabled):hover {
            background: #c0151d !important;
            color: #fff !important;
            border-color: #c0151d !important;
        }
    }

    @media only screen and (max-width: 768px) {
        .newspapers-container { padding: 10px; }

        .pdf-toolbar {
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px 12px;
        }

        .pdf-toolbar-left,
        .pdf-toolbar-center,
        .pdf-toolbar-right { flex: none; }

        .pdf-title { display: none; }
    }
</style>
