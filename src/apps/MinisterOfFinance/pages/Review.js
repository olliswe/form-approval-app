import React, {useContext, useEffect, useState} from "react";
import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import AppHeader from "../../../components/General/AppHeader";
import ReviewList from "../../../components/Epets1/ReviewList";
import ReviewCard from "../components/ReviewCard";
import {UserContext} from "../../../context/auth";


const Review = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertFormId, setAlertFormId] = useState(null);
    const [refresh, setRefresh] = useState(false)
    const userContext = useContext(UserContext)

    useEffect(()=>{

        console.log(showAlert)
    },[showAlert]);


    const getBody = (status) => {
        let body = {}
        if (status === 'approve'){
            body = {
                fs_minister_review:false,
                minister:false,
                minister_approve:true,
                tracker_user: userContext.state.user.full_name
            }
        }
        else if (status === 'reject'){
            body = {
                fs_minister_review:false,
                minister:false,
                minister_reject:true,
                reject:true,
                tracker_user: userContext.state.user.full_name
            }
        }
        return body
    }

    const doRefresh = (event) => {
        setRefresh(true)

        setTimeout(() => {
            console.log('Async operation has ended');
            setRefresh(false)
            event.detail.complete();
        }, 1000);
    }



    return (
        <IonPage>
            <AppHeader/>
            <IonContent>
                <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <ReviewList getBody={getBody} refresh={refresh}>
                    <ReviewCard/>
                </ReviewList>
            </IonContent>
        </IonPage>
    )
}

export default Review