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
import {UserContext} from "../../../../context/auth";
import {arrowBack} from "ionicons/icons";
import {withRouter} from "react-router";
import Epets2ReviewList from "../../../../components/Epets2/Epets2ReviewList";
import Epets2ReviewCard from "../../components/Epets2/Epets2ReviewCard";


const Epets2Review = (props) => {

    const [refresh, setRefresh] = useState(false)
    const userContext = useContext(UserContext)



    const getBody = (status) => {
        let body = {}
        if (status === 'approve'){
            body = {
                institutional_head:false,
                principal_accountant:true,
            }
        }
        else if (status === 'reject'){
            body = {
                mda_minister:false,
                reject:true,
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
                        EPETS-2 review
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <Epets2ReviewList getBody={getBody} refresh={refresh}>
                    <Epets2ReviewCard/>
                </Epets2ReviewList>
            </IonContent>
        </IonPage>
    )
}

export default withRouter(Epets2Review)