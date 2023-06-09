import axios from 'axios';


const userInstance = (tokenName)=>{
    const instance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
        timeout:5000,
        headers:{
            'Content-Type':'application/json'
        }
    });

    //instance request interceptor
    instance.interceptors.request.use((request)=>{
        const token = localStorage.getItem(tokenName);
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    })

    return instance;
}

const adminInstance = (tokenName)=>{
    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_SERVER_URL}/admin`,
        timeout:5000,
        headers:{
            'Content-Type':'application/json'
        }
    });

    //instance request interceptor
    instance.interceptors.request.use((request)=>{
        const token = localStorage.getItem(tokenName);
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    })

    return instance;
}

export {userInstance,adminInstance};