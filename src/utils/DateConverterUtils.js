class DateConverterUtils {
    convertDateToTimestamp(date) {
        return new Date(date).getTime();
    }
}

export default new DateConverterUtils();
