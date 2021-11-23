import axiosClient from "./AxiosClient";
import { AsyncStorage } from 'react-native';
// let jwt = window.localStorage.getItem('jwt');
let jwt
AsyncStorage.getItem('jwt').then(res =>{
    jwt = res
})

export const order = async (donhang)=>{
    let headers = {
        Authorization: 'Bearer ' + jwt
    }
    const url = "/donhang"
    try {
        const response = await axiosClient.post(url, donhang, {headers} )
        return response
    } catch (error) {
        throw error
    }
}

export const getListOrder = async()=>{
    let headers = {
        Authorization: 'Bearer ' + jwt
    }
    const url = '/donhang'
    try {
        const response = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}
export const getListOrderBySort = async(sortField, sortType)=>{
    let headers = {
        Authorization: 'Bearer ' + jwt
    }
    const params = {
        sortType,
        sortField
    }
    const url = '/donhang'
    try {
        const response = await axiosClient.get(url, {params, headers})
        return response
    } catch (error) {
        throw error
    }
}

export const getListOrderByKhachhang = async()=>{
    let headers = {
        Authorization: 'Bearer ' + jwt
    }
    const url = '/donhang/khachhang'
    try {
        const response = await axiosClient.get(url, {headers})
        return response
    } catch (error) {
        throw error
    }
}

export const updateStatus = async ({madh, trangthai})=>{
    let headers = {
        Authorization: 'Bearer ' + jwt
    }
    const url = "/donhang"
    const params ={
        madh,
        trangthai
    }
    try {
        const response = await axiosClient.put(url, {},{params, headers})
        return response
    } catch (error) {
        throw error
    }
}