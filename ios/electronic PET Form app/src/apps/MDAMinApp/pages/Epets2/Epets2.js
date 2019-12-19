import React from 'react';
import {IonContent, IonPage} from "@ionic/react";
import AppHeader from "../../../../components/General/AppHeader";
import Epets2Segment from "../../components/Epets2/Epets2Segment";


const Epets2Wrapper = ({component: ChildComponent, ...rest}) => {


    return (
        <IonPage>
            <AppHeader/>
            <Epets2Segment/>
            <IonContent>
                <ChildComponent/>
            </IonContent>
        </IonPage>
    );
}

export default Epets2Wrapper;