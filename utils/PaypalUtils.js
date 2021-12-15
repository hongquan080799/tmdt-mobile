import axiosClient from "../api/AxiosClient";
import * as crypto from 'crypto-js'
import * as base64 from 'base-64'
import * as utf8 from 'utf8'
import { AsyncStorage } from 'react-native';
export const getPayPalLinl = async(order, price, username)=>{
    var orderData = base64.encode(utf8.encode(JSON.stringify(order)))

    try {
        const data = {
            link : 'http://192.168.1.10:8080/forwardMobile?extraData=' + orderData + "&username=" + username ,
            price
        }
        let jwt = await AsyncStorage.getItem('jwt');        
        let headers = {
            Authorization: 'Bearer ' + jwt
        }
        let params = {
            httt:1
        }
        const res = await axiosClient.post('/donhang/getPayUrl',data, {headers, params})
        return res
    } catch (error) {
        throw error
     }

}

export const getExtraData = (data)=>{
    return utf8.decode(base64.decode(data))
}