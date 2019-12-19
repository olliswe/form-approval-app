import React from "react";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route, withRouter} from "react-router";
import {home} from "ionicons/icons";
import SideMenu from "../../components/General/SideMenu";
import Epets1Wrapper from "./pages/Epets1/Epets1";
import Epets2Wrapper from "./pages/Epets2/Epets2";
import Home from "./pages/General/MDAMinHome";
import Epets1Review from "./pages/Epets1/Epets1Review";
import Epets2Review from "./pages/Epets2/Epets2Review";
import HomeTracking from "./components/Epets1/HomeTracking";
import CompletedList from "../../components/Epets1/CompletedList";
import RejectedList from "../../components/Epets1/RejectedList";
import Epets2CompletedList from "../../components/Epets2/Epets2CompletedList";
import Epets2RejectedList from "../../components/Epets2/Epets2RejectedList";
import Epets2Tracking from "./components/Epets2/Epets2Tracking";

const MDAMinApp  = (props) => {

    return (
        <>
            <SideMenu/>
            <IonTabs
            >
                <IonRouterOutlet id='main'
                                 animated={false}
                >
                    <Route path="/mdamin" render={()=><Redirect to='/mdamin/home'/>} exact={true}/>
                    <Route path="/mdamin/home" component={Home} exact={true}/>
                    <Route path="/mdamin/epets1" render={()=><Epets1Wrapper component={HomeTracking}/>} exact={true}/>
                    <Route path="/mdamin/epets1/completed" render={()=><Epets1Wrapper component={CompletedList}/>} exact={true}/>
                    <Route path="/mdamin/epets1/rejected" render={()=><Epets1Wrapper component={RejectedList}/>} exact={true}/>
                    <Route path="/mdamin/epets1/review" component={Epets1Review} exact={true}/>
                    <Route path="/mdamin/epets2" render={()=><Epets2Wrapper component={Epets2Tracking}/>} exact={true}/>
                    <Route path="/mdamin/epets2/completed" render={()=><Epets2Wrapper component={Epets2CompletedList}/>} exact={true}/>
                    <Route path="/mdamin/epets2/rejected" render={()=><Epets2Wrapper component={Epets2RejectedList}/>} exact={true}/>
                    <Route path="/mdamin/epets2/review" component={Epets2Review} exact={true}/>
                </IonRouterOutlet>
                <IonTabBar slot="bottom"
                >
                    <IonTabButton tab="mdamin" href='/mdamin/home' selected={props.location.pathname==='/mdamin/home'}>
                        <IonIcon icon={home}/>
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="epets1" href='/mdamin/epets1' selected={props.location.pathname==='/mdamin/epets1' || props.location.pathname==='/mdamin/epets1/completed' || props.location.pathname==='/mdamin/epets1/rejected'  }>
                        <span className={'number-icon-'+(props.location.pathname==='/mdamin/epets1' || props.location.pathname==='/mdamin/epets1/completed' || props.location.pathname==='/mdamin/epets1/rejected')}>1</span>
                        <IonLabel>e-PETs 1</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="epets2" href='/mdamin/epets2' selected={props.location.pathname==='/mdamin/epets2' || props.location.pathname==='/mdamin/epets2/completed' || props.location.pathname==='/mdamin/epets2/rejected'}>
                        <span className={'number-icon-'+(props.location.pathname==='/mdamin/epets2' || props.location.pathname==='/mdamin/epets2/completed' || props.location.pathname==='/mdamin/epets2/rejected')}>2</span>
                        <IonLabel>e-PETs 2</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </>
    )
};

export default withRouter(MDAMinApp);
