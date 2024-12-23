import axios from 'axios';
const axiosInstance=axios.create({
baseURL:'https://ictak-internship-w182.onrender.com'
})
axiosInstance.interceptors.request.use((config)=>{
const accessToken=sessionStorage.getItem('token');
if(accessToken){

    if(config){
        config.headers.token=accessToken;
    }
}
return config;
},(error)=>{

    return Promise.reject(error);
}

)
export default axiosInstance