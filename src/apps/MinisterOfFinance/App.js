import React from "react";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route, withRouter} from "react-router";
import Review from "./pages/Review"
import {alert as alertIcon, home} from "ionicons/icons";
import Home from "../../pages/Epets1/Home";
import SideMenu from "../../components/General/SideMenu";


const MoFApp  = (props) => {





    return (
        <>
        <SideMenu/>
        <IonTabs>
            <IonRouterOutlet id='main'
            animated={false}
            >
                <Route path="/mof" render={()=><Redirect to='/mof/home'/>} exact={true}/>
                <Route path="/mof/home" component={Home} exact={true}/>
                <Route path="/mof/review" component={Review} exact={true}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom"
            >
                <IonTabButton tab="home" href='/mof/home' selected={props.location.pathname==='/mof/home'}>
                    <IonIcon icon={home}/>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="review" href='/mof/review' selected={props.location.pathname==='/mof/review'}>
                    <IonIcon icon={alertIcon}/>
                    <IonLabel>Review</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
        </>
    )
};

export default withRouter(MoFApp);
