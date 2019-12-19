import React, {useState} from "react";
import {IonActionSheet, IonAvatar, IonButton, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow} from "@ionic/react";
import {eye} from "ionicons/icons";
import {withRouter} from "react-router";

const Epets2AwaitingReviewCard  = (props) => {

    const [showAlert, setShowAlert] = useState(false)


    const handleViewEpets2 = () => {
        props.history.push({
            pathname: '/view_epets2',
            state: { form: props.form }
        })
    }

    const handleViewPVCCF = () => {
        props.history.push({
            pathname: '/view_pvccf',
            state: { form: props.form }
        })
    }


    return (
        <>
            <IonItem
                key={props.form.id}
            >
                <IonAvatar slot="start">
                    <img src="assets/images/completed.png" alt=""/>
                </IonAvatar>
                <IonLabel>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="9.5" className='ion-text-wrap'>
                                <p>
                                    <strong>
                                        EPET-2 Form ID: {props.form.id}
                                    </strong>
                                </p>
                                <p>
                                    <strong>
                                        PVCCF Form ID: {props.form.pvccf_form.id }
                                    </strong>
                                </p>
                                <p>
                                    Submitted {props.form.formatted_date} days ago
                                </p>
                                <p>
                                    <strong>MDA:</strong> {props.form.name_of_mda}
                                </p>
                                <p>
                                    <strong>Title:</strong> {props.form.program_title}
                                </p>
                            </IonCol>
                            <IonCol size="2.5" className='center-col'>
                                <IonButton
                                    onClick={()=>setShowAlert(true)}
                                >
                                    <IonIcon slot="icon-only" icon={eye}/>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonLabel>
            </IonItem>
            <IonActionSheet
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Select to view:'}
                buttons={[
                    {
                        text: 'EPETS-2',
                        handler: () => {
                            handleViewEpets2()
                        }
                    },
                    {
                        text: 'PVCCF',
                        handler: () => {
                            handleViewPVCCF()
                        }
                    }
                ]}
            />
        </>
    )
}

export default withRouter(Epets2AwaitingReviewCard)
