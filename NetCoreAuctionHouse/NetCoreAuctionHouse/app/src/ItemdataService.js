import axios from 'axios'


const REST_API_URL = 'https://localhost:5001/api/v1'


class ItemDataService {

    /*
    retrieveAllCourses(name) {
        //console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/courses`);
    }*/

    retrieveItem(id) {
        console.log('executed service')
        return axios.get(`${REST_API_URL}/item/${id}`);
    }
/*
    deleteCourse(name, id) {
        //console.log('executed service')
        return axios.delete(`${INSTRUCTOR_API_URL}/courses/${id}`);
    }
    */

    updateItem(id) {
        //console.log('executed service')
        return axios.put(`${REST_API_URL}/item/${id}`);
    }
/*
    createCourse(name, course) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/courses/`, course);
    }
    */
}

export default new ItemDataService()