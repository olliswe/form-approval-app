import React from "react";
import {
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import ReportItem from "../../components/General/ReportItem";


const ViewRequestForm = (props) => {

    const form = props.location.state.form.requestform



    const handleBack = () => {
        props.history.goBack()
    }





    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                    <span onClick={handleBack}>
                        <IonIcon  icon={arrowBack} />
                        Back
                    </span>
                    </IonButtons>
                    <IonTitle>
                        View Request Form ID: {form.id}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h4 className='ion-margin'>Request Form Report</h4>
                <IonList>
                    <ReportItem title={'Name of MDA'} content={form.name_of_mda} />
                    <ReportItem title={'Name'} content={form.name} />
                    <ReportItem title={'Position'} content={form.position} />
                    <ReportItem title={'Amount (SLL)'} content={form.amount}/>
                    <IonItem>
                        <IonGrid>
                        {form.files && form.files.map((file, index)=>
                            <IonRow className='ion-margin-vertical'>
                                <a href={file.file} target='_blank'>Supporting Document {index+1}</a>
                            </IonRow>
                        )}
                        </IonGrid>
                    </IonItem>
                    
                    {
                        !!form.log?
                            <IonItem>
                                <IonGrid>
                                    <IonRow>
                                        <strong>Log</strong>
                                    </IonRow>
                                    <IonRow>
                                        <span dangerouslySetInnerHTML={{__html:form.log}}/>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            :
                            <ReportItem title={'Logs'} content={'No logs available'}/>
                    }
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default ViewRequestForm