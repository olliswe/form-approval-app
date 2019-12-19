import React, {useContext, useState} from 'react';
import {IonRefresher, IonRefresherContent, IonRow, useIonViewWillEnter} from "@ionic/react";
import HomeScreenCardSkeleton from "../../../../components/General/HomeScreenCardSkeleton";
import axios from 'axios'
import {UserContext} from "../../../../context/auth";
import Epet2HomeScreenCard from "../../../../components/Epets2/Epet2HomeScreenCard";


const Epets2Tracking = (props) => {

    const [dataRequest, setDataRequest] = useState({loading:true, data:null})

    const userContext = useContext(UserContext)
    const token = userContext.state.token

    const getData = () => {
        setDataRequest({loading:true})
        axios.get(process.env.REACT_APP_API_URL+'/mda-min/epets2-tracking/', {headers:{'Authorization':'Token '+token}})
            .then(res=>{
                setDataRequest({loading:false, data:res.data})
            })
    }

    useIonViewWillEnter(()=>{
        getData()
    })

    const doRefresh = (event) => {
        getData()

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
            <IonRow className='ion-justify-content-center ion-margin-top'>
                <strong>Internal - Overview</strong>
            </IonRow>
            {dataRequest.loading ?
                <>
                    <IonRow>
                        <HomeScreenCardSkeleton/>
                    </IonRow>
                    <IonRow>
                        <HomeScreenCardSkeleton/>
                    </IonRow>
                    <IonRow>
                        <HomeScreenCardSkeleton/>
                    </IonRow>
                    <IonRow>
                        <HomeScreenCardSkeleton/>
                    </IonRow>
                    <IonRow>
                        <HomeScreenCardSkeleton/>
                    </IonRow>
                    <IonRow>
                        <HomeScreenCardSkeleton/>
                    </IonRow>
                </>
                :
                <>
                    <IonRow>
                        <Epet2HomeScreenCard name='Awaiting your review' status='pending-review' count={dataRequest.data.awaiting_your_review}/>
                    </IonRow>
                    < IonRow>
                        <Epet2HomeScreenCard name='Program Manager' status='pending-review' count={dataRequest.data.pm}/>
                    </IonRow>
                    < IonRow >
                        <Epet2HomeScreenCard name='Professional Head' status='pending-review' count={dataRequest.data.ph}/>
                    </IonRow>
                    <IonRow>
                        <Epet2HomeScreenCard name='Vote Controller' status='pending-review' count={dataRequest.data.vc}/>
                    </IonRow>
                    < IonRow >
                        <Epet2HomeScreenCard name='Principal Accountant' status='awaiting-ifmis' count={dataRequest.data.pa}/>
                    </IonRow>
                    <IonRow>
                        <Epet2HomeScreenCard name='Vote Controller' status='awaiting-submission' count={dataRequest.data.vc_submit}/>
                    </IonRow>
                </>
            }

        </>
    );
};

export default Epets2Tracking;
