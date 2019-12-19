import React from "react";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route, withRouter} from "react-router";
import Review from "./pages/Review"
import {alert as alertIcon, home} from "ionicons/icons";
import Home from "../../pages/Epets1/Home";
import SideMenu from "../../components/General/SideMenu";


const FSApp  = (props) => {





    return (
        <>
        <SideMenu/>
        <IonTabs
        >
            <IonRouterOutlet id='main'
            animated={false}
            >
                <Route path="/fs" render={()=><Redirect to='/fs/home'/>} exact={true}/>
                <Route path="/fs/home" component={Home} exact={true}/>
                <Route path="/fs/review" component={Review} exact={true}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom"
            >
                <IonTabButton tab="fs" href='/fs' selected={props.location.pathname==='/fs/home'}>
                    <IonIcon icon={home}/>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="review" href='/fs/review' selected={props.location.pathname==='/fs/review'}>
                    <IonIcon icon={alertIcon}/>
                    <IonLabel>Review</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
       </>
    )
};

export default withRouter(FSApp);
