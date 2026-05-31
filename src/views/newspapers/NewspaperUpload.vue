<template>
  <div class="container-fluid">
    <loading-overlay :show="loading" :fullscreen="false" message="Yükleniyor..." />
    <b-row v-if="!loading">
      <!-- SOL PANEL: Form + Gazete Listesi -->
      <b-col md="5">
        <div class="left-panel">
          <h4 class="text-center mb-3">Gazete Bilgileri</h4>

          <!-- Form Alanları -->
          <b-form @submit.prevent="saveNewspaper">
            <b-form-group label="Başlık :" label-for="newspaperTitle" label-cols-sm="3">
              <b-form-input id="newspaperTitle" v-model="newspaper.title" required></b-form-input>
            </b-form-group>

            <b-form-group label="Sayı :" label-for="newspaperIssue" label-cols-sm="3">
              <b-form-input id="newspaperIssue" v-model="newspaper.issue" type="number" :min="0" required></b-form-input>
            </b-form-group>

            <b-form-group label="Yıl :" label-for="newspaperYear" label-cols-sm="3">
              <b-form-input id="newspaperYear" v-model="newspaper.year" type="number" :min="2015" required></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-end">
              <b-button type="submit" variant="success" size="sm" class="text-white">
                <b-icon icon="plus"></b-icon> Kaydet
              </b-button>
              <b-button variant="danger" size="sm" class="ml-1 text-white" @click="clearForm">
                Temizle
              </b-button>
            </div>
          </b-form>

          <hr/>

          <!-- Gazete Listesi -->
          <h5 class="text-center">Gazeteler</h5>
          <b-table
              :fields="newspapersFields"
              :items="newspapersItems"
              striped hover
              small
              selectable
              select-mode="single"
              @row-clicked="onNewspaperSelect"
              :tbody-tr-class="rowClass"
          >
            <template v-slot:cell(operations)="row">
              <b-button variant="danger" size="sm" @click.stop="deleteNewspaper(row.item.id)">
                <b-icon icon="trash-fill" variant="white"></b-icon>
              </b-button>
            </template>
          </b-table>
        </div>
      </b-col>

      <!-- SAĞ PANEL: Seçili gazetenin sayfaları + sürükle bırak -->
      <b-col md="7">
        <div class="right-panel">
          <div v-if="!selectedNewspaper">
            <div class="text-center text-muted" style="margin-top: 80px;">
              <b-icon icon="arrow-left-circle" font-scale="3" class="mb-3"></b-icon>
              <p>Sayfaları görüntülemek için sol listeden bir gazete seçin.</p>
            </div>
          </div>

          <div v-else>
            <h4 class="text-center mb-3">
              {{ selectedNewspaper.title }} - Sayı {{ selectedNewspaper.issue }} ({{ selectedNewspaper.year }})
            </h4>

            <!-- Sürükle Bırak Alanı -->
            <div
                class="drop-zone"
                :class="{ 'drop-zone-active': dragActive }"
                @dragover.prevent="dragActive = true"
                @dragleave.prevent="dragActive = false"
                @drop.prevent="onDrop"
                @click="$refs.fileInput.click()"
            >
              <b-icon icon="cloud-upload" font-scale="2" class="mb-2"></b-icon>
              <p class="mb-1">PDF dosyalarını buraya sürükleyin veya tıklayın</p>
              <p class="text-muted small mb-0">Dosya adları sayfa numarası olmalıdır (örn: 1.pdf, 2.pdf)</p>
              <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept=".pdf"
                  style="display: none"
                  @change="onFileSelect"
              />
            </div>

            <!-- Bekleyen Dosyalar -->
            <div v-if="pendingFiles.length > 0" style="margin-top: 15px;">
              <h6 class="text-center">Yüklenecek Dosyalar ({{ pendingFiles.length }})</h6>
              <b-table :fields="pendingFields" :items="pendingFiles" striped hover small>
                <template v-slot:cell(remove)="row">
                  <b-button variant="outline-danger" size="sm" @click="removeFile(row.index)">
                    <b-icon icon="x"></b-icon>
                  </b-button>
                </template>
              </b-table>
              <b-row align-h="center" class="mb-3">
                <b-button variant="success" @click="uploadAll" :disabled="uploading">
                  <b-icon icon="cloud-upload"></b-icon> Tümünü Yükle
                </b-button>
                <b-button variant="outline-danger" style="margin-left: 10px" @click="clearFiles">
                  <b-icon icon="x-circle"></b-icon> Temizle
                </b-button>
              </b-row>
            </div>

            <hr/>

            <!-- Mevcut Sayfalar -->
            <h5 class="text-center">Mevcut Sayfalar</h5>
            <b-table :fields="pagesFields" :items="pagesItems" striped hover small>
              <template v-slot:cell(operations)="row">
                <b-button variant="danger" size="sm" @click="deletePage(row.item.id)">
                  <b-icon icon="trash-fill" variant="white"></b-icon>
                </b-button>
              </template>
            </b-table>
            <p v-if="pagesItems.length === 0" class="text-center text-muted">Henüz sayfa yüklenmemiş.</p>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NewspaperService from "../../service/NewspaperService";
import LoadingOverlay from "../../components/LoadingOverlay";

export default {
  components: { LoadingOverlay },
  data() {
    return {
      loading: false,
      newspaper: {
        title: '',
        issue: '',
        year: '',
      },
      selectedNewspaper: null,
      newspapersItems: [],
      newspapersFields: [
        { key: 'title', label: 'Başlık' },
        { key: 'issue', label: 'Sayı' },
        { key: 'year', label: 'Yıl' },
        { key: 'operations', label: '' }
      ],
      dragActive: false,
      pendingFiles: [],
      uploading: false,
      pendingFields: [
        { key: 'pageNumber', label: 'Sayfa No', sortable: true },
        { key: 'fileName', label: 'Dosya Adı' },
        { key: 'remove', label: '' }
      ],
      pagesItems: [],
      pagesFields: [
        { key: 'pageNumber', label: 'Sayfa No' },
        { key: 'operations', label: 'İşlemler' }
      ]
    }
  },

  methods: {
    // Gazete kaydetme
    async saveNewspaper() {
      if (!this.newspaper.title) {
        this.$errorNotification(this, 'Lütfen gazete başlığı giriniz!');
        return;
      }
      if (!this.newspaper.issue) {
        this.$errorNotification(this, 'Lütfen sayı değerini giriniz!');
        return;
      }
      if (!this.newspaper.year) {
        this.$errorNotification(this, 'Lütfen yıl değerini giriniz!');
        return;
      }
      this.loading = true;
      try {
        await NewspaperService.saveNewspaper(this.newspaper);
        this.$notification(this, 'Gazete başarılı bir şekilde kayıt edildi.');
        this.clearForm();
        await this.loadNewspapers();
      } catch (e) {
        this.$errorNotification(this, e.message);
      } finally {
        this.loading = false;
      }
    },

    async deleteNewspaper(newspaperId) {
      this.loading = true;
      try {
        await NewspaperService.deleteNewspaper(newspaperId);
        this.$notification(this, 'Gazete başarılı bir şekilde silindi.');
        if (this.selectedNewspaper && this.selectedNewspaper.id === newspaperId) {
          this.selectedNewspaper = null;
          this.pagesItems = [];
        }
        await this.loadNewspapers();
      } catch (e) {
        this.$errorNotification(this, e.message);
      } finally {
        this.loading = false;
      }
    },

    async loadNewspapers() {
      try {
        this.newspapersItems = await NewspaperService.list();
      } catch (e) {
        console.error(e);
      }
    },

    clearForm() {
      this.newspaper.title = '';
      this.newspaper.issue = '';
      this.newspaper.year = '';
    },

    // Gazete seçimi - sağ paneli aç
    onNewspaperSelect(item) {
      if (this.selectedNewspaper && this.selectedNewspaper.id === item.id) return;
      this.selectedNewspaper = item;
      this.pendingFiles = [];
      this.loading = true;
      this.loadPages().finally(() => { this.loading = false; });
    },

    rowClass(item) {
      if (this.selectedNewspaper && item.id === this.selectedNewspaper.id) {
        return 'table-primary';
      }
      return '';
    },

    // Sürükle bırak
    onDrop(event) {
      this.dragActive = false;
      const files = event.dataTransfer.files;
      this.processFiles(files);
    },

    onFileSelect(event) {
      const files = event.target.files;
      this.processFiles(files);
      this.$refs.fileInput.value = '';
    },

    processFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const match = file.name.match(/^(\d+)\.pdf$/i);
        if (!match) {
          this.$errorNotification(this, `"${file.name}" geçersiz dosya adı. Dosya adı sayfa numarası olmalıdır (örn: 1.pdf, 2.pdf)`);
          continue;
        }
        const pageNumber = parseInt(match[1]);

        const existing = this.pendingFiles.find(f => f.pageNumber === pageNumber);
        if (existing) {
          this.$errorNotification(this, `Sayfa ${pageNumber} zaten listede mevcut.`);
          continue;
        }

        this.pendingFiles.push({
          file: file,
          pageNumber: pageNumber,
          fileName: file.name
        });
      }
      this.pendingFiles.sort((a, b) => a.pageNumber - b.pageNumber);
    },

    removeFile(index) {
      this.pendingFiles.splice(index, 1);
    },

    clearFiles() {
      this.pendingFiles = [];
    },

    // Upload
    async uploadAll() {
      if (this.pendingFiles.length === 0) {
        this.$errorNotification(this, 'Lütfen en az bir PDF dosyası ekleyin!');
        return;
      }

      this.uploading = true;
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('newspaperId', this.selectedNewspaper.id);

        this.pendingFiles.forEach(item => {
          formData.append('files', item.file);
        });

        await NewspaperService.uploadPages(formData);
        this.$notification(this, 'Sayfalar başarılı bir şekilde yüklendi.');
        this.pendingFiles = [];
        await this.loadPages();
      } catch (e) {
        this.$errorNotification(this, e.message || 'Yükleme sırasında bir hata oluştu.');
      } finally {
        this.uploading = false;
        this.loading = false;
      }
    },

    // Mevcut sayfalar
    async loadPages() {
      if (!this.selectedNewspaper) return;
      try {
        this.pagesItems = await NewspaperService.getPagesByNewspaperId(this.selectedNewspaper.id, 'Asc');
      } catch (e) {
        console.error(e);
      }
    },

    async deletePage(pageId) {
      this.loading = true;
      try {
        await NewspaperService.deletePage(pageId);
        this.$notification(this, 'Sayfa başarılı bir şekilde silindi.');
        await this.loadPages();
      } catch (e) {
        this.$errorNotification(this, e.message);
      } finally {
        this.loading = false;
      }
    }
  },

  async beforeMount() {
    this.loading = true;
    await this.loadNewspapers();
    this.loading = false;
  }
}
</script>

<style scoped>
.left-panel {
  border-right: 1px solid #dee2e6;
  padding-right: 20px;
  min-height: 80vh;
}

.right-panel {
  padding-left: 20px;
  min-height: 80vh;
}

.drop-zone {
  border: 3px dashed #ccc;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fafafa;
}

.drop-zone:hover {
  border-color: #28a745;
  background-color: #f0fff4;
}

.drop-zone-active {
  border-color: #28a745;
  background-color: #e6ffe6;
  transform: scale(1.01);
}
</style>

