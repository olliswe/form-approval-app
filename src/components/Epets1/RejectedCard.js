import React from "react";
import {IonAvatar, IonButton, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow} from "@ionic/react";
import {eye} from "ionicons/icons";
import {withRouter} from "react-router";

const RejectedCard  = (props) => {


    const handleView = () => {
        props.history.push({
            pathname: '/view_pet',
            state: { form: props.form }
        })
    }


    return (

        <IonItem
            key={props.form.id}
        >
            <IonAvatar slot="start">
                <img src="assets/images/rejected.png" alt=""/>
            </IonAvatar>
            <IonLabel>
                <IonGrid>
                    <IonRow>
                        <IonCol size="9.5" className='ion-text-wrap'>
                            <p>
                                <strong>
                                    PET Form ID: {props.form.id}
                                </strong>
                            </p>
                            <p>
                                Submitted {props.form.formatted_date} days ago
                            </p>
                            <p>
                                <strong>MDA:</strong> {props.form.name_of_mda}
                            </p>
                            <p>
                                <strong>Title:</strong> {props.form.program_title.cost_centre_description} ({props.form.program_title.cost_centre_code})
                            </p>
                        </IonCol>
                        <IonCol size="2.5" className='center-col'>
                            <IonButton
                                onClick={handleView}
                            >
                                <IonIcon slot="icon-only" icon={eye}/>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonLabel>
        </IonItem>
    )
}

export default withRouter(RejectedCard)
