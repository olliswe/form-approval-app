import React, {useContext, useState} from "react";
import {
    IonContent,
    IonGrid,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonSpinner,
    useIonViewWillEnter
} from "@ionic/react";
import AppHeader from "../../components/General/AppHeader";
import {UserContext} from "../../context/auth";
import HomeScreenCard from "../../components/General/HomeScreenCard";
import axios from 'axios'
import HomeScreenCardSkeleton from "../../components/General/HomeScreenCardSkeleton";
import {Doughnut} from "react-chartjs-2";

const Home = () => {

    const userContext = useContext(UserContext)
    const user = userContext.state.user
    const token = userContext.state.token

    const [formCounter, setFormCounter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [graphNumbers, setGraphNumbers] = useState([])

    const getGraphData = (data) => {
        let numbers  = [0,0,0,0]
        data.map((item, index)=>{
            if (item.action === 'pending-review'){
                numbers[0]+=item.count
            }
            else if (item.action === 'awaiting-ifmis'){
                numbers[1]+=item.count
            }
            else if (item.action === 'completed'){
                numbers[2]+=item.count
            }
            else if (item.action === 'rejected'){
                numbers[3]+=item.count
            }
        })
        setGraphNumbers(numbers)

    }

    const getCount = () => {
        setLoading(true)
        axios.get(process.env.REACT_APP_API_URL+'/forms-count/'+user.category+'/', {headers:{'Authorization':'Token '+token}})
            .then(res=>{
                setFormCounter(res.data)
                getGraphData(res.data)
                setLoading(false)
            })
    }

    // const getGraph = () => {
    //     setGraphRequest({loading:true})
    //     axios.get(process.env.REACT_APP_API_URL+'/graph-data/'+user.category+'/', {headers:{'Authorization':'Token '+token}})
    //         .then(res=>{
    //             setGraphRequest({loading:false, data:res.data})
    //         })
    // }

    useIonViewWillEnter(()=>{
        getCount()
    })



    const doRefresh = (event) => {
        getCount()

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
                    {loading ?
                    <div
                        style={{
                            height: '15vh',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: '6vh'
                        }}
                    >
                        <IonSpinner color='primary'/>
                    </div>
                    :
                    <Doughnut
                        data={{
                            datasets: [{
                                data: graphNumbers,
                                backgroundColor: [
                                    '#F79B2F',
                                    '#59D220',
                                    '#07930C',
                                    '#FF2929'

                                ]
                            }
                            ],
                            labels: ['Awaiting Review', 'Awaiting IFMIS', 'Completed', 'Rejected'],
                        }}
                        options={{
                            maintainAspectRatio: true,
                            legend: {position: 'top', labels: {boxWidth: 10}},

                        }}
                    />
                    }
                    <IonRow className='ion-justify-content-center'>
                        <h5>Location of your PET Forms</h5>
                    </IonRow>
                    {loading ?
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
                        formCounter.map((item,key)=>
                            <IonRow key={key}>
                                <HomeScreenCard
                                    name={item.name}
                                    status={item.action}
                                    count={item.count}
                                />
                            </IonRow>
                        )
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Home