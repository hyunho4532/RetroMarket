import axios from 'axios';

const requestProcessCardSendData = () => {
    return axios.post('http://localhost:8081/data', {}, { withCredentials: true });
}

export { requestProcessCardSendData };