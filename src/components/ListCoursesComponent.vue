<script>
    import CourseDataService from '../service/CourseDataService';
    export default {
        name: "CoursesList",
        data() {
            return {
                INSTRUCTOR: "in28minutes"
            };
        },
        methods: {
            refreshCourses() {
                CourseDataService.retrieveAllCourses(this.INSTRUCTOR) //HARDCODED
                    .then(response => {
                        console.log(response.data);
                    });
            }
        },
        created() {
            this.refreshCourses();
        }
    };
</script>