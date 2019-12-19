import {
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonViewDidLeave
} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import React, {useContext, useEffect, useState} from "react";
import {withRouter} from "react-router";
import FormCardSkeleton from "../../components/General/FormCardSkeleton";
import axios from 'axios'
import {UserContext} from "../../context/auth";
import CompletedCard from "../../components/Epets1/CompletedCard";


const Completed = (props) => {

    const [loading, setLoading] = useState(true)
    const [forms, setForms] = useState(null)

    const userContext = useContext(UserContext)
    const user = userContext.state.user
    const token = userContext.state.token

    const handleBack = () => {
        props.history.goBack()
    }

    const getForms = () => {
        setLoading(true)
        axios.get(process.env.REACT_APP_API_URL+'/forms-completed/',{headers:{'Authorization':'Token '+token}})
            .then(res=>{
                setForms(res.data)
                setLoading(false)
            })
    }

    useEffect(()=> {
        getForms()
    },[])


    useIonViewDidLeave(()=>{
        setForms(null)
        setLoading(true)
    })

    const doRefresh = (event) => {
        getForms()

        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 1000);
    }





    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                    <span onClick={handleBack}>
                        <IonIcon  icon={arrowBack} />
                        Back
                    </span>
                    </IonButtons>
                    <IonTitle>
                        Completed
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonGrid>
                    <IonRow className='ion-justify-content-center ion-margin-horizontal'>
                        <h2>EPET-1 Forms entered into IFMIS</h2>
                    </IonRow>
                </IonGrid>
                {loading ?
                    <IonList>
                        <FormCardSkeleton/>
                        <FormCardSkeleton/>
                        <FormCardSkeleton/>
                    </IonList>
                    :
                    (
                        forms.length>0 ?
                            <IonList>
                                {forms.map((form)=>
                                    <CompletedCard form={form}/>
                                )}
                            </IonList>

                            :
                            <IonGrid>
                                <IonRow className='ion-margin ion-justify-content-center'>
                                    No forms have been entered into IFMIS
                                </IonRow>
                            </IonGrid>
                    )

                }
            </IonContent>
        </IonPage>
    )
}


export default withRouter(Completed)