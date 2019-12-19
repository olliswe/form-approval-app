import React, {useContext, useState} from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonGrid,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonSpinner,
    useIonViewWillEnter
} from "@ionic/react";
import AppHeader from "../../../../components/General/AppHeader";
import {UserContext} from "../../../../context/auth";
import {Doughnut} from "react-chartjs-2";
import axios from 'axios'


const Home = () => {

    const userContext = useContext(UserContext);
    const user = userContext.state.user;
    const token = userContext.state.token;

    const [epets1Data, setEpets1Data] = useState({data:null, loading:true});
    const [epets2Data, setEpets2Data] = useState({data:null, loading:true});

    const epets1GraphRequest = () => {
        setEpets1Data({loading:true})
        axios.get(process.env.REACT_APP_API_URL+'/mda-min/epets1-graph/', {headers:{'Authorization':'Token '+token}})
            .then(res=>{
                setEpets1Data({data:res.data, loading:false})
                console.log(res.data.slice(0,-1))
            })
    }

    const epets2GraphRequest = () => {
        setEpets2Data({loading:true})
        axios.get(process.env.REACT_APP_API_URL+'/mda-min/epets2-graph/', {headers:{'Authorization':'Token '+token}})
            .then(res=>{
                setEpets2Data({data:res.data, loading:false})
            })
    }



    useIonViewWillEnter(()=>{
        epets1GraphRequest()
        epets2GraphRequest()
    })


    const doRefresh = (event) => {
        epets1GraphRequest()
        epets2GraphRequest()

        setTimeout(() => {
            console.log('Async operation has ended');
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
                <IonGrid>
                    <IonRow className='ion-justify-content-center'>
                        <h3>Welcome {user.full_name}</h3>
                    </IonRow>
                </IonGrid>
                <IonCard className='ion-padding-bottom'>
                    <IonCardHeader>
                        <IonCardTitle style={{display:'flex',justifyContent:'center'}}>
                            e-PETs 1 Locations
                        </IonCardTitle>
                    </IonCardHeader>
                    {epets1Data.loading ?
                        <div
                            style={{
                                height: '20vh',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: '6vh'
                            }}
                        >
                            <IonSpinner color='primary'/>
                        </div>
                        :
                        <>
                        <Doughnut
                            data={{
                                datasets: [{
                                    data: epets1Data.data.slice(0,-1),
                                    backgroundColor: [
                                        '#F79B2F',
                                        '#c6eb34',
                                        '#59D220',
                                        '#07930C',
                                        '#FF2929'

                                    ]
                                }
                                ],
                                labels: ['Awaiting review (Internal)', 'Awaiting submission (Internal)', 'With MoF', 'Completed', 'Rejected'],
                            }}
                            options={{
                                maintainAspectRatio: true,
                                legend: {position: 'top', labels: {boxWidth: 10}},

                            }}
                        />
                        <IonGrid>
                            <IonRow className='ion-justify-content-center ion-margin-top' >
                                There are {epets1Data.data.slice(-1)[0]} form(s) pending your review
                            </IonRow>
                        </IonGrid>

                        </>
                    }
                </IonCard>
                <IonCard className='ion-padding-bottom ion-margin-top'>
                        <IonCardHeader>
                            <IonCardTitle style={{display:'flex',justifyContent:'center'}}>
                                e-PETs 2 Locations
                            </IonCardTitle>
                        </IonCardHeader>
                    {epets2Data.loading?
                        <div
                            style={{
                                height: '20vh',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: '6vh'
                            }}
                        >
                            <IonSpinner color='primary'/>
                        </div>
                        :
                        <>
                        <Doughnut
                            data={{
                                datasets: [{
                                    data: epets2Data.data.slice(0,-1),
                                    backgroundColor: [
                                        '#F79B2F',
                                        '#c6eb34',
                                        '#59D220',
                                        '#07930C',
                                        '#FF2929'

                                    ]
                                }
                                ],
                                labels: ['Awaiting Review', 'Awaiting IFMIS entry', 'Awaiting Submission', 'With AGD', 'Rejected'],
                            }}
                            options={{
                                maintainAspectRatio: true,
                                legend: {position: 'top', labels: {boxWidth: 10}},

                            }}
                        />
                        <IonGrid>
                            <IonRow className='ion-justify-content-center ion-margin-top'>
                                There are {epets2Data.data.slice(-1)[0]} form(s) pending your review
                            </IonRow>
                        </IonGrid>

                        </>
                    }
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Home;
