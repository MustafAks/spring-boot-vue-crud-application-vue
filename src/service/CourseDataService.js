import axios from "axios";

const COURSE_API_URL = "http://localhost:9090";
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/course/`;
const LIST_URL = `${COURSE_API_URL}/course/list`;

class CourseDataService {
    retrieveAllCourses() {
        return axios.get(`${INSTRUCTOR_API_URL}`);
    }
    listCourses(course) {
        return axios.post(`${LIST_URL}`, course);
    }
    createCourse(course) {
        return axios.post(`${INSTRUCTOR_API_URL}`, course);
    }
}

export default new CourseDataService();
