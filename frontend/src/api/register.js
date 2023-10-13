import axios from "axios";

export function registerUserDataSend(itemData) {
    axios.post('http://localhost:8081/api/registerUser', itemData, {
        withCredentials: true,
    })
        .then(response => {
            console.log(`데이터 요청 완료 ${response.data}`);
        })
        .catch(error => {
            console.log(`데이터 요청 중 에러: ${error}`);
        });
}