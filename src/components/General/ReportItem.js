import React from "react";
import {IonGrid, IonItem, IonRow} from "@ionic/react";


const ReportItem = (props) => {

    return (
        <IonItem>
            <IonGrid>
                <IonRow>
                    <strong>{props.title}</strong>
                </IonRow>
                <IonRow>
                    {props.content}
                </IonRow>
            </IonGrid>
        </IonItem>
    )
}

export default ReportItem