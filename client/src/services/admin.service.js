import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/admin/';

class AdminService{

    getAllSurvey() {
        return axios.get(API_URL + 'get-all-surveys', {headers:authHeader()});
    }



}
export default new AdminService();