import {Plugins} from "@capacitor/core";
import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'

const { PushNotifications } = Plugins;



const PushListener = (props) => {

    useEffect(()=> {
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification) => {
                let data = notification.notification.data
                console.log(notification);
                if (data.type){
                    if (data.type==='mof_review_pet'){
                        props.history.push('/mof/review')
                    }
                    else if (data.type==='fs_review_pet'){
                        props.history.push('/fs/review')
                    }
                    else if (data.type==='mda_min_review_pet'){
                        props.history.push("/mdamin/epets1/review")
                    }
                    else if (data.type==='mda_min_review_pet2'){
                        props.history.push("/mdamin/epets2/review")
                    }
                }

            }
        );
    },[])


    return null
}

export default withRouter(PushListener)