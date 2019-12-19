import React, {useContext, useState} from "react";
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import ReviewList from "../../../../components/Epets1/ReviewList";
import ReviewCard from "../../components/Epets1/ReviewCard";
import {UserContext} from "../../../../context/auth";
import {arrowBack} from "ionicons/icons";
import {withRouter} from "react-router";


const Epets1Review = (props) => {

    const [showAlert, setShowAlert] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const userContext = useContext(UserContext)



    const getBody = (status) => {
        let body = {}
        if (status === 'approve'){
            body = {
                mda_minister:false,
                mda_minister_approve:true,
                tracker_user: userContext.state.user.full_name
            }
        }
        else if (status === 'reject'){
            body = {
                mda_minister:false,
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
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                    <span onClick={()=>{props.history.goBack()}}>
                        <IonIcon  icon={arrowBack} />
                        Back
                    </span>
                    </IonButtons>
                    <IonTitle>
                        EPETS-1 review
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
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

export default withRouter(Epets1Review)