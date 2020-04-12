const paymentArray = [{key: "Alınmadı", value: "Not Paid"}, {key: "Alındı", value: "Paid"}];
const paymentArrayForFilterList = [{text: "Alınmadı", value: "Not Paid"}, {text: "Alındı", value: "Paid"}];

class EnumService {
    async getPaymentArray() {
        return paymentArray;
    }

    async getPaymentArrayForFilterList() {
        return paymentArrayForFilterList;
    }
}

export default new EnumService();
