import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonAlert, IonApp, isPlatform} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import MoFApp from "./apps/MinisterOfFinance/App";
import FSApp from "./apps/FinancialSec/App";
import MDAMinApp from './apps/MDAMinApp/App'
import Login from "./pages/General/Login";
import NotFound from "./pages/General/NotFound";
import ViewPet from "./pages/Epets1/ViewPet";
import {UserContext} from "./context/auth";
import {Plugins} from '@capacitor/core';
import AwaitingReview from "./pages/Epets1/AwaitingReview";
import AwaitingIFMIS from "./pages/Epets1/AwaitingIFMIS";
import Completed from "./pages/Epets1/Completed";
import Rejected from "./pages/Epets1/Rejected";
import {addDeviceTokenToUser} from './messaging/push'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import PushListener from "./components/General/PushListener";
import AwaitingSubmission from "./pages/Epets1/AwaitingSubmission";
import Epets2AwaitingReview from "./pages/Epets2/Epets2AwaitingReview";
import Epets2AwaitingIFMIS from "./pages/Epets2/Epets2AwaitingIFMIS";
import Epets2AwaitingSubmission from "./pages/Epets2/Epets2AwaitingSubmission";
import ViewEpets2 from "./pages/Epets2/ViewEpets2";
import ViewPVCCF from "./pages/Epets2/ViewPVCCF";

import {FCM} from "capacitor-fcm";
import ViewRequestForm from "./pages/Epets2/ViewRequestForm";

const fcm = new FCM();

const { Storage } = Plugins;
const { PushNotifications } = Plugins;



const App  = () => {

    let userContext = useContext(UserContext)
    const [networkStatus, setNetworkState]=useState({connected:true})
    const [showNetworkAlert, setShowNetworkAlert] = useState(true)

    const { Network } = Plugins;

    let handler = Network.addListener('networkStatusChange', (status) => {
        setNetworkState(status)
    });



    useEffect(()=>{
        let user = null
        let token = null
        Storage.get({key: 'user'})
            .then(res => {
                user = JSON.parse(res.value)
            })
            .finally(
                Storage.get({key: 'token'})
                    .then(res => {
                        token = res.value
                    })
                    .then(res => {
                            if (!!user && !!token) {
                                userContext.dispatch({type: "login", payload: {user: user, token: token}})
                                PushNotifications.register();
                                PushNotifications.addListener('registration',
                                    (device_token) => {

                                        if (isPlatform('ios')) {
                                            console.log('this is ios')

                                            fcm
                                                .getToken()
                                                .then(r => addDeviceTokenToUser(r.token, user.id, token))
                                        }
                                        if (isPlatform('android')) {
                                            console.log('this is android')

                                            console.log('Push registration success, token: ' + device_token.value);
                                            addDeviceTokenToUser(device_token.value, user.id, token)

                                        }
                                    }
                                );

                                PushNotifications.addListener('registrationError',
                                    (error) => {
                                        console.log('Error on registration: ' + JSON.stringify(error));
                                    }
                                );
                            }
                        }
                    )
                    )

    }, [])

    return (
        <IonApp>
            {!networkStatus.connected &&
            <IonAlert className='ion-padding' color='danger'  isOpen={showNetworkAlert}  onDidDismiss={() => setShowNetworkAlert(false)}
                      header={'Network Error'}
                      subHeader={'Sorry, you don\'t seem to be connected to the internet.'}
                      message={'Please connect to a network to ensure the app works properly!'}
                      buttons={['OK']}
            />
            }
            <IonReactRouter>
                <PushListener/>
                <AuthRoute path="/mof" component={MoFApp} category={['Minister']}/>
                <AuthRoute path="/fs" component={FSApp} category={['Financial Secretary']}/>
                <AuthRoute path="/mdamin" component={MDAMinApp} category={['Minister (MDA)']}/>
                <AuthRoute path="/view_pet" component={ViewPet} category={['Minister (MDA)','Financial Secretary','Minister' ]}/>
                <AuthRoute path="/view_epets2" component={ViewEpets2} category={['Minister (MDA)']}/>
                <AuthRoute path="/view_pvccf" component={ViewPVCCF} category={['Minister (MDA)']}/>
                <AuthRoute path="/view_request_form" component={ViewRequestForm} category={['Minister (MDA)']}/>
                <AuthRoute path="/view_review" component={AwaitingReview} category={['Minister (MDA)','Financial Secretary','Minister' ]}/>
                <AuthRoute path="/view_awaiting_ifmis" component={AwaitingIFMIS} category={['Financial Secretary','Minister', 'Minister (MDA)' ]}/>
                <AuthRoute path="/view_completed" component={Completed} category={['Financial Secretary','Minister' ]}/>
                <AuthRoute path="/view_rejected" component={Rejected} category={['Financial Secretary','Minister' ]}/>
                <AuthRoute path="/view_awaiting_submission" component={AwaitingSubmission} category={['Financial Secretary','Minister','Minister (MDA)' ]}/>
                <AuthRoute path="/view_epets2_review" component={Epets2AwaitingReview} category={['Minister (MDA)']}/>
                <AuthRoute path="/view_epets2_awaiting_ifmis" component={Epets2AwaitingIFMIS} category={['Minister (MDA)']}/>
                <AuthRoute path="/view_epets2_awaiting_submission" component={Epets2AwaitingSubmission} category={['Minister (MDA)']}/>
                <LoginRoute exact path="/login" component={Login}/>
                <RedirectRoute exact path="/" component={NotFound}/>
            </IonReactRouter>
        </IonApp>
    )
};


const AuthRoute = ({component: ChildComponent, category, ...rest}) => {

    let userContext = React.useContext(UserContext)

    return <Route {...rest} render={props => {
        if (userContext.state.isAuthenticated) {
            if (category.includes(userContext.state.user.category)) {
                return <ChildComponent {...props}/>
            }
            else {
                return <Redirect to='/'/>
            }
        }
        else {
            return <Redirect to='/login'/>
        }

    }} />
};

const RedirectRoute = ({component: ChildComponent, category, ...rest}) => {

    let userContext = React.useContext(UserContext)

    return <Route {...rest} render={props => {
        if (userContext.state.isAuthenticated) {
            if (userContext.state.user.category === 'Minister') {
                return <Redirect to='/mof'/>
            }
            else if (userContext.state.user.category === 'Financial Secretary') {
                return <Redirect to='/fs'/>
            }
            else if (userContext.state.user.category === 'Minister (MDA)') {
                return <Redirect to='/mdamin'/>
            }
            else{
                return <ChildComponent {...props}/>
            }
        }
        else {
            return <Redirect to='/login'/>
        }

    }} />
};


const LoginRoute = ({component: ChildComponent, category, ...rest}) => {

    let userContext = React.useContext(UserContext)
    console.log(userContext)

    return <Route {...rest} render={props => {
        if (userContext.state.isAuthenticated) {
                return <Redirect to='/'/>
        }
        else {
            return <ChildComponent {...props}/>
        }
    }} />
};

export default App;
