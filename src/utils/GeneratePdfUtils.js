import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class GeneratePdfUtils {
    download(content, filename) {
        pdfMake.createPdf(content).download(filename);
    }

    open(content) {
        pdfMake.createPdf(content).open();
    }
}

export default new GeneratePdfUtils();
