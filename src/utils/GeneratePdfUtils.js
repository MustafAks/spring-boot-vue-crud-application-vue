import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class GeneratePdfUtils {
    async download(content) {
        pdfMake.createPdf(content).download();
    }
}

export default new GeneratePdfUtils();
