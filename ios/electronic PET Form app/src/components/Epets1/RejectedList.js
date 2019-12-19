import {IonGrid, IonList, IonRefresher, IonRefresherContent, IonRow} from "@ionic/react";
import React, {useContext, useEffect, useState} from "react";
import {withRouter} from "react-router";
import FormCardSkeleton from "../General/FormCardSkeleton";
import axios from 'axios'
import {UserContext} from "../../context/auth";
import RejectedCard from "./RejectedCard";


const RejectedList = (props) => {

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
        axios.get(process.env.REACT_APP_API_URL+'/forms-rejected/',{headers:{'Authorization':'Token '+token}})
            .then(res=>{
                setForms(res.data)
                setLoading(false)
            })
    }

    useEffect(()=> {
        getForms()
    },[])




    const doRefresh = (event) => {
        getForms()

        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 1000);
    }





    return (
        <>
            <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonGrid>
                <IonRow className='ion-justify-content-center ion-margin-horizontal'>
                    <h2>EPET-1 Forms rejected</h2>
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
                                <RejectedCard form={form}/>
                            )}
                        </IonList>

                        :
                        <IonGrid>
                            <IonRow className='ion-margin ion-justify-content-center'>
                                No forms have been rejected
                            </IonRow>
                        </IonGrid>
                )

            }
        </>
    )
}


export default withRouter(RejectedList)