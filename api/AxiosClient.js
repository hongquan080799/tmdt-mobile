import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL : 'http://192.168.1.10:8080',
    header:{
        'content-type':'application/json'
    },
    paramsSerializer : params => queryString.stringify(params),
});

axiosClient.interceptors.response.use( response=>{
    if(response && response.data)
        return response.data;
    return response
},error=>{
    return Promise.reject(error.response)
})

export default axiosClient
