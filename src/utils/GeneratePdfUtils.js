import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import NewspaperService from "../service/NewspaperService";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class GeneratePdfUtils {
    download(content, filename) {
        pdfMake.createPdf(content).download(filename);
    }

    open(content) {
        pdfMake.createPdf(content).open();
    }

    async openWithPageId(pageId) {
        const data = await NewspaperService.getFile(pageId);
        var arrayBuffer = this.base64ToArrayBuffer(data); //data is the base64 encoded string
        var blob = new Blob([arrayBuffer], {type: "application/pdf"});
        var link = window.URL.createObjectURL(blob);
        // window.open(link,'', 'height=650,width=840');
        window.open(link);
    }

    base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }
}

export default new GeneratePdfUtils();
