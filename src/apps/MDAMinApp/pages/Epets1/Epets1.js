import React from 'react';
import {IonContent, IonPage} from "@ionic/react";
import AppHeader from "../../../../components/General/AppHeader";
import Epets1Segment from "../../components/Epets1/Epets1Segment";


const Epets1Wrapper = ({component: ChildComponent, ...rest}) => {


    return (
            <IonPage>
                <AppHeader/>
                <Epets1Segment/>
                <IonContent>
                    <ChildComponent/>
                </IonContent>
            </IonPage>
    );
}

export default Epets1Wrapper;