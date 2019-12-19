import React, {useContext, useState} from 'react';
import {IonItemDivider, IonRefresher, IonRefresherContent, IonRow, useIonViewWillEnter} from "@ionic/react";
import HomeScreenCard from "../../../../components/General/HomeScreenCard";
import HomeScreenCardSkeleton from "../../../../components/General/HomeScreenCardSkeleton";
import axios from 'axios'
import {UserContext} from "../../../../context/auth";


const HomeTracking = (props) => {

    const [dataRequest, setDataRequest] = useState({loading:true, data:null})

    const userContext = useContext(UserContext)
    const token = userContext.state.token

    const getData = () => {
        setDataRequest({loading:true})
        axios.get(process.env.REACT_APP_API_URL+'/mda-min/epets1-tracking/', {headers:{'Authorization':'Token '+token}})
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
                </>
                :
                <>
                <IonRow>
                    <HomeScreenCard name='Awaiting your review' status='pending-review' count={dataRequest.data.awaiting_your_review}/>
                </IonRow>
                < IonRow >
                    <HomeScreenCard name='Professional Head' status='pending-review' count={dataRequest.data.ph}/>
                </IonRow>
                <IonRow>
                    <HomeScreenCard name='Vote Controller' status='pending-review' count={dataRequest.data.vc}/>
                </IonRow>
                <IonRow>
                    <HomeScreenCard name='Vote Controller' status='awaiting-submission' count={dataRequest.data.vc_submit}/>
                </IonRow>
                </>
            }
            <IonRow className='ion-margin-horizontal'>
                <IonItemDivider/>
            </IonRow>
            <IonRow className='ion-justify-content-center ion-margin-top'>
                <strong>External - Overview</strong>
            </IonRow>
            {
                dataRequest.loading ?
                    <>
                    <IonRow>
                        <HomeScreenCardSkeleton/>
                    </IonRow>
                    < IonRow >
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
                    <HomeScreenCard name='Budget Bureau' status='pending-review' count={dataRequest.data.bb}/>
                </IonRow>
                < IonRow >
                    < HomeScreenCard name='Budget Director' status='pending-review' count={dataRequest.data.bd}/>
                </IonRow>
                <IonRow>
                    <HomeScreenCard name='Financial Secretary' status='pending-review' count={dataRequest.data.fs}/>
                </IonRow>
                <IonRow>
                    <HomeScreenCard name='Minister of Finance' status='pending-review' count={dataRequest.data.mof}/>
                </IonRow>
                <IonRow>
                    <HomeScreenCard name='Budget Bureau' status='awaiting-ifmis' count={dataRequest.data.bb_ifmis} />
                </IonRow>
                </>
            }
        </>
    );
};

export default HomeTracking;
