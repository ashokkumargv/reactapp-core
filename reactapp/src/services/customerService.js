import axios from "axios";
class CustomerService {
    getAll() {
        return axios.get(`https://localhost:7021/customer`);
    }

    addCustomer(formData) {
        const customer = JSON.stringify(formData);
        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return axios.post(`https://localhost:7021/customer/AddCustomer`,  customer, customConfig );
    }

    updateCustomer(formData) {
        const customer = JSON.stringify(formData);
        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return axios.post(`https://localhost:7021/customer/updatecustomer`,  customer, customConfig );
    }
    
    DeleteCustomer(id) {
        return axios.delete(`https://localhost:7021/customer/deletecustomer/${id}`);
    }
}


export default new CustomerService();