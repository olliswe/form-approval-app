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
        if (status === 'send to Minister for review'){
            body = {
                bb_fs_review :false,
                financial_secretary : false,
                fs_minister_review : true,
                pending : false,
                track_user : userContext.state.user.full_name,
                minister:true,
            }
        }
        else if (status === 'approve'){
            body = {
                bb_fs_review :false,
                financial_secretary : false,
                fs_approve : true,
                pending : false,
                track_user : userContext.state.user.full_name,
            }
        }
        else if (status === 'reject'){
            body = {
                bb_fs_review :false,
                financial_secretary : false,
                reject : true,
                pending : false,
                track_user : userContext.state.user.full_name
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