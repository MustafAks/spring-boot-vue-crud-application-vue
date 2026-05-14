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
                    <b-button variant="light" size="sm" :disabled="currentPageIndex <= 0" @click="prevPage" class="pdf-nav-btn">
                        <b-icon icon="chevron-left"></b-icon>
                    </b-button>
                    <span class="pdf-page-info">
                        {{ pages[currentPageIndex].pageNumber }}. Sayfa / {{ pages.length }} Sayfa
                    </span>
                    <b-button variant="light" size="sm" :disabled="currentPageIndex >= pages.length - 1" @click="nextPage" class="pdf-nav-btn">
                        <b-icon icon="chevron-right"></b-icon>
                    </b-button>
                </div>
                <div class="pdf-toolbar-right">
                    <b-button variant="outline-danger" size="sm" @click="closePdfViewer" class="pdf-close-btn">
                        <b-icon icon="x" font-scale="1.3"></b-icon>
                    </b-button>
                </div>
            </div>
            <div class="pdf-content" @contextmenu.prevent>
                <loading-overlay :show="pdfLoading" :fullscreen="false" message="PDF yükleniyor..." />
                <div v-if="!pdfLoading && pdfData" class="pdf-scroll-container">
                    <pdf
                        v-for="i in pdfNumPages"
                        :key="i"
                        :src="pdfData"
                        :page="i"
                        class="pdf-page-render"
                    ></pdf>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NewspaperService from "../../service/NewspaperService";
import LoadingOverlay from "../../components/LoadingOverlay";
import pdf from "vue-pdf";

export default {
    name: 'Newspapers',
    components: { LoadingOverlay, pdf },
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
            pdfData: null,
            pdfNumPages: 0,
            currentPageIndex: 0
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
                    await this.loadPdf(this.pages[0].id);
                }
            } finally {
                this.pdfLoading = false;
            }
        },

        closePdfViewer() {
            this.pdfViewerOpen = false;
            this.clearPdf();
            this.pages = [];
            document.body.style.overflow = '';
            this.hideFooter(false);
        },

        async loadPdf(pageId) {
            this.pdfLoading = true;
            this.clearPdf();
            try {
                const data = await NewspaperService.getFile(pageId);
                const binaryString = window.atob(data);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const loadingTask = pdf.createLoadingTask({ data: bytes });
                const pdfDoc = await loadingTask.promise;
                this.pdfNumPages = pdfDoc.numPages;
                this.pdfData = loadingTask;
            } finally {
                this.pdfLoading = false;
            }
        },

        clearPdf() {
            this.pdfData = null;
            this.pdfNumPages = 0;
        },

        async prevPage() {
            if (this.currentPageIndex > 0) {
                this.currentPageIndex--;
                await this.loadPdf(this.pages[this.currentPageIndex].id);
            }
        },

        async nextPage() {
            if (this.currentPageIndex < this.pages.length - 1) {
                this.currentPageIndex++;
                await this.loadPdf(this.pages[this.currentPageIndex].id);
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
        this.clearPdf();
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
        align-items: flex-start;
        justify-content: center;
        overflow: auto;
        background: #f2f3f4;
        padding: 20px;
        -webkit-overflow-scrolling: touch;
    }

    .pdf-scroll-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        width: 100%;
        max-width: 900px;
    }

    .pdf-page-render {
        width: 100%;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
    }

    .pdf-nav-btn {
        color: #ec1b24;
        border-color: #fff;
        background: #fff;
        font-weight: 600;
    }

    .pdf-nav-btn:hover {
        background: #c0151d;
        color: #fff;
        border-color: #c0151d;
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
