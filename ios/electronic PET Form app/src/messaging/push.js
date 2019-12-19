import {Plugins} from '@capacitor/core';
import React from 'react'
import axios from 'axios'


const { PushNotifications } = Plugins;




export const addDeviceTokenToUser = (device_token, user_id, auth_token) => {
    let headers = {'Content-Type': 'application/json','Authorization':'Token '+ auth_token }
    let body = {
        token:device_token,
        user_id:user_id
    }
    axios.post(process.env.REACT_APP_API_URL+'/FCM-token/', body, {headers:headers})
        .then(res=>console.log(res))
}