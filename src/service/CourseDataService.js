import axios from "axios";

const COURSE_API_URL = "http://localhost:9090";
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/course/`;

class CourseDataService {
    retrieveAllCourses() {
        return axios.get(`${INSTRUCTOR_API_URL}`);
    }
}

export default new CourseDataService();