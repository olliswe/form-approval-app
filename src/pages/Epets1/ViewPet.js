import React, {useEffect} from "react";
import {
    IonButtons,
    IonCol,
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


const ViewPet = (props) => {

    const form = props.location.state.form

    useEffect(()=>{
        console.log(form)
    },[])

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
                            View Pet Form ID: {form.id}
                        </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h4 className='ion-margin'>EPET-1 Form Report</h4>
                <IonList>
                    <ReportItem title={'Name of MDA'} content={form.name_of_mda} />
                    <ReportItem title={'Financial Year'} content={form.financial_year} />
                    <ReportItem title={'Implementing Division'} content={form.department.department_name} />
                    <ReportItem title={'Division Code'} content={form.department.department_code} />
                    <ReportItem title={'Programme Title'} content={form.program_title.cost_centre_description} />
                    <ReportItem title={'Cost Center Code'} content={form.program_title.cost_centre_code} />
                    <ReportItem title={'Activity Description'} content={form.activity_description} />
                    <ReportItem title={'Activity Objectives'} content={form.activity_objectives} />
                    <ReportItem title={'Scope and time of this activity'} content={form.scope_time_of_activity} />
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>Activity Location</strong>
                            </IonRow>
                            <IonRow>
                                {Array.isArray(form.activity_location) ?

                                        form.activity_location.map((location) =>
                                            <span>{location},&nbsp;</span>
                                        )

                                    :
                                    form.activity_location

                                }
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <ReportItem title={'Expected Outcome'} content={form.expected_outcome} />
                    <ReportItem title={'Target Beneficiaries'} content={form.target_beneficaries} />
                    <ReportItem title={'Amount allocated for this activity'} content={form.amount_allocated+' SLL'} />
                    <ReportItem title={'Balance of uncommitted fund available for this activity'} content={form.balance_uncommitted_funds+' SLL'} />
                    <ReportItem title={'Select as appropriate'} content={form.circle_appropriate} />
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>Detailed costing of activity inputs</strong>
                            </IonRow>
                            <IonRow>
                                <IonCol size='2'><em>No</em></IonCol>
                                <IonCol size='6'><em>Activity</em></IonCol>
                                <IonCol size='4'><em>Amount</em></IonCol>
                            </IonRow>
                            {form.activities.map((activity, index)=>
                                <IonRow>
                                    <IonCol size='2'>{index+1}</IonCol>
                                    <IonCol size='6'>{activity.activity}</IonCol>
                                    <IonCol size='4'>{activity.amount+' SLL'}</IonCol>
                                </IonRow>
                            )}
                        </IonGrid>
                    </IonItem>
                    <ReportItem title={'Total cost of activity inputs'} content={form.total_amount+' SLL'} />
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>Supporting documents</strong>
                            </IonRow>
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

export default ViewPet