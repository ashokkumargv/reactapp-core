import axios from "axios";
class UserService {
    getAll() {
        return axios.get(`https://localhost:7021/user`)
    }
}


export default new UserService();