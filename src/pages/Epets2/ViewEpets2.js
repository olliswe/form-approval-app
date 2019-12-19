import React, {useEffect} from "react";
import {
    IonButton,
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


const ViewEpets2 = (props) => {

    const form = props.location.state.form

    useEffect(()=>{
        console.log(form)
    },[])

    const handleBack = () => {
        props.history.goBack()
    }

    const handleViewPET1 = () => {
        props.history.push({
            pathname: '/view_pet',
            state: { form: props.location.state.form.petform }
        })
    }

    const handleViewPVCCF = () => {
        props.history.push({
            pathname: '/view_pvccf',
            state: { form: form }
        })
    }


    const handleViewRequestForm = () => {
        props.history.push({
            pathname:'/view_request_form',
            state: {form:form}
        })
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
                        View EPET-2 Form ID: {form.id}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h4 className='ion-margin'>EPET-2 Form Report</h4>
                <IonList>
                    <ReportItem title={'Name of MDA'} content={form.name_of_mda} />
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>EPET-1 Form</strong>
                            </IonRow>
                            <IonRow>
                                <IonButton onClick={handleViewPET1}>View EPET-1 ID: {form.petform.id}</IonButton>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>PVCCF</strong>
                            </IonRow>
                            <IonRow>
                                <IonButton onClick={handleViewPVCCF}>View PVCCF ID: {form.pvccf_form.id}</IonButton>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>Request Form</strong>
                            </IonRow>
                            <IonRow>
                                <IonButton onClick={handleViewRequestForm}>View Request Form ID: {form.requestform.id}</IonButton>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <ReportItem title={'Division'} content={form.division} />
                    <ReportItem title={'Programme Title / Cost Center Code'} content={form.program_title} />
                    <ReportItem title={'Region'} content={form.region} />
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>District</strong>
                            </IonRow>
                            <IonRow>
                                {Array.isArray(form.district) ?

                                    form.district.map((location) =>
                                        <span>{location},&nbsp;</span>
                                    )

                                    :
                                    form.district

                                }
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <ReportItem title={'Expenditure Options'} content={form.expenditure_options} />
                    <ReportItem title={'Objective of Expenditure'} content={form.objective_of_expenditure} />
                    <ReportItem title={'Local Council Development Project'} content={form.local_council} />
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

export default ViewEpets2