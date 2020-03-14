import axios from 'axios'

let httpGet = axios.get;
let httpPost = axios.post;

// export default {
//     login: function (phone, code) {
//         return httpPost('/api/u/register_or_login', {phone: phone, code: code})
//     },
//     logout: function(){
//         return httpPost('/api/u/logout')
//     },
//     sendCode: function (phone) {
//         return httpPost('/api/u/send_code', {phone: phone})
//     },
//
//
//     companyList: function () {
//         return httpGet('/api/s/company/list')
//     },
// }
