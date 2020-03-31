import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class GeneratePdfUtils {
    download(content) {
        pdfMake.createPdf(content).download();
    }

    open(content) {
        pdfMake.createPdf(content).open();
    }
}

export default new GeneratePdfUtils();
