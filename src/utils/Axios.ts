// import SummaryApi,  { baseURL }  from "@/common/SummaryApi";
// import axios from "axios";

// const Axios = axios.create({
//     baseURL : baseURL,
//     withCredentials : true
// })

// //sending access token in the header
// Axios.interceptors.request.use(
//     async(config)=>{
//         const accessToken = localStorage.getItem('accesstoken')

//         if(accessToken){
//             config.headers.Authorization = `Bearer ${accessToken}`
//         }

//         return config
//     },
//     (error)=>{
//         return Promise.reject(error)
//     }
// )

// //extend the life span of access token with 
// // the help refresh
// Axios.interceptors.request.use(
//     (response)=>{
//         return response
//     },
//     async(error)=>{
//         let originRequest = error.config 

//         if(error.response.status === 401 && !originRequest.retry){
//             originRequest.retry = true

//             const refreshToken = localStorage.getItem("refreshToken")

//             if(refreshToken){
//                 const newAccessToken = await refreshAccessToken(refreshToken)

//                 if(newAccessToken){
//                     originRequest.headers.Authorization = `Bearer ${newAccessToken}`
//                     return Axios(originRequest)
//                 }
//             }
//         }
        
//         return Promise.reject(error)
//     }
// )


// const refreshAccessToken = async(refreshToken:any)=>{
//     try {
//         const response = await Axios({
//             ...SummaryApi.refreshToken,
//             headers : {
//                 Authorization : `Bearer ${refreshToken}`
//             }
//         })

//         const accessToken = response.data.data.accessToken
//         localStorage.setItem('accesstoken',accessToken)
//         return accessToken
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default Axios

import SummaryApi, { baseURL } from "@/common/SummaryApi";
import axios from "axios";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    // timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor - add any headers or modifications
Axios.interceptors.request.use(
    (config) => {
        // You can add common headers here if needed
        // config.headers['X-Custom-Header'] = 'value';
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle responses and errors
Axios.interceptors.response.use(
    (response) => {
        // You can transform response data here if needed
        return response;
    },
    (error) => {
        // Handle common errors
        console.error('API Error:', error.response?.data || error.message);
        
        // You can add global error handling here
        if (error.response?.status === 500) {
            console.error('Server Error - Please try again later');
        }
        
        if (error.response?.status === 404) {
            console.error('Resource not found');
        }
        
        return Promise.reject(error);
    }
);

export default Axios;