import React from "react";
import {
    IonButton,
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


const ViewPVCCF = (props) => {

    const form = props.location.state.form.pvccf_form;



    const handleBack = () => {
        props.history.goBack()
    };

    const handleView = () => {
        props.history.push({
            pathname: '/view_epets2',
            state: { form: props.location.state.form }
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
                        View PVCCF ID: {form.id}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h4 className='ion-margin'>PVCCF Report</h4>
                <IonList>
                    <ReportItem title={'Name of MDA'} content={form.name_of_mda} />
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>EPET-2 Form</strong>
                            </IonRow>
                            <IonRow>
                                <IonButton onClick={handleView}>View EPET-2 ID: {props.location.state.form.id}</IonButton>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <h5 className='ion-margin'>Payment Voucher</h5>
                    <ReportItem title={'Temp Save Number'} content={form.temp_save_no} />
                    <ReportItem title={'COM Number'} content={form.com_no} />
                    <ReportItem title={'Cheque Number'} content={form.cheque_no} />
                    <ReportItem title={'Payee'} content={form.payee} />
                    <ReportItem title={'Accounting Office'} content={form.accounting_office} />
                    <ReportItem title={'Object of Expenditure'} content={form.object_of_expenditure} />
                    <ReportItem title={'Payment Description'} content={form.payment_description} />
                    <ReportItem title={'Purchase Order Number'} content={form.purchase_order_no} />
                    <ReportItem title={'Invoice Number'} content={form.invoice_no} />

                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>Gross-Coding Block</strong>
                            </IonRow>
                            {form.activities.map((activity, index)=>
                                <IonRow>
                                    <IonCol size='2'>{index+1}</IonCol>
                                    <IonCol size='10'>
                                        <IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    <strong>Cost Centre</strong>
                                                </IonRow>
                                                <IonRow>
                                                    {activity.cost_centre}
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                        <IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    <strong>Fund</strong>
                                                </IonRow>
                                                <IonRow>
                                                    {activity.cost_centre}
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                        <IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    <strong>Activity</strong>
                                                </IonRow>
                                                <IonRow>
                                                    {activity.activity}
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                        <IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    <strong>Location</strong>
                                                </IonRow>
                                                <IonRow>
                                                    {activity.location}
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                        <IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    <strong>Object</strong>
                                                </IonRow>
                                                <IonRow>
                                                    {activity.object}
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                        <IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    <strong>Amount</strong>
                                                </IonRow>
                                                <IonRow>
                                                    {activity.amount}&nbsp;SLL
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            )}
                        </IonGrid>
                    </IonItem>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <strong>{'NET Total Amount (after deductions)'}</strong>
                            </IonRow>
                            <IonRow>
                                {form.total_amount}&nbsp;SLL
                            </IonRow>
                            <IonRow>
                                <small>
                                    The following deductions have been automatically applied: <br/>
                                    1. 5% deduction for Withholding Tax <br/>
                                    2. 0.5% deduction for Free Healthcare
                                </small>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <h5 className='ion-margin'>Control Commitment Form</h5>
                    <ReportItem title={'Commitment Number'} content={form.commitment_no}/>
                    <ReportItem title={'Value'} content={form.value + ' SLL'}/>
                    <ReportItem title={'Account Code'} content={form.account_code}/>
                    <ReportItem title={'Description'} content={form.description}/>
                    <ReportItem title={'Checked for funds'} content={!!form.checked_for_fund ? 'Yes' : 'No'}/>
                    <ReportItem title={'Commitment entered'} content={!!form.commitment_entered ? 'Yes' : 'No'}/>



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

export default ViewPVCCF