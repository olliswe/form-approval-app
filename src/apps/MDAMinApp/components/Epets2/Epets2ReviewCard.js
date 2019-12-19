import React, {useContext, useEffect, useState} from "react";
import {
    IonActionSheet,
    IonAvatar,
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonRow,
    IonSpinner,
    IonTextarea
} from "@ionic/react";
import {alert as alertIcon, arrowDropright, checkmarkCircleOutline, eye, trash} from "ionicons/icons";
import axios from "axios";
import {UserContext} from "../../../../context/auth";
import {withRouter} from "react-router";


const Epets2ReviewCard = (props) => {


    const [showAlert, setShowAlert] = useState(false);
    const [viewAlert, setViewAlert] = useState(false)
    const [status, setStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [error, setError] = useState(false)

    const userContext = useContext(UserContext)

    useEffect(()=>{
        console.log(props.form)
        if (!!status) {
            setShowModal(true)
        }

    },[status])

    const handleSubmit = () => {
        setLoading(true);
        setCompleted(false);
        setError(false);
        let headers = {'Authorization':'Token '+userContext.state.token};
        let body = {...props.getBody(status), comment:comment};
        axios.patch(process.env.REACT_APP_API_URL+'/epet2form-review/'+props.form.id+'/', body,{headers:headers})
            .then(res=>{
                setLoading(false);
                setCompleted(true);
            })
            .catch(error=>{
                setLoading(false);
                setError(true);
            })
    }

    const isDone = loading || completed || error

    const handleClose = () => {
        setShowModal(false);
        setComment('');
        setShowConfirmation(false);
        setLoading(false);
        setCompleted(false);
        setError(false);
        props.handleLoad()
    }




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
                    <img src="assets/images/pending-review.png" alt=""/>
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
                                    Submitted {props.form.formatted_date} days ago
                                </p>
                                <p>
                                    <strong>MDA:</strong> {props.form.name_of_mda}
                                </p>
                                <p>
                                    <strong>Title:</strong> {props.form.program_title}
                                </p>
                                <p>
                                    <strong>PV Temp Save No: </strong>{props.form.pvccf_form.temp_save_no }
                                </p>
                            </IonCol>
                            <IonCol size="2.5">
                                <IonRow className='ion-justify-content-center' style={{height:"50%"}}>
                                    <IonButton
                                        onClick={()=>setViewAlert(true)}
                                    >
                                        <IonIcon slot="icon-only" icon={eye}/>
                                    </IonButton>
                                </IonRow>
                                <IonRow className='ion-justify-content-center' style={{height:"50%"}}>
                                    <IonButton color='warning'
                                               onClick={()=>{
                                                   setShowAlert(true)
                                               }}
                                    >
                                        <IonIcon slot="icon-only" icon={alertIcon} />
                                    </IonButton>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonLabel>
            </IonItem>
            <IonActionSheet
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header = {'Please select an Action for EPET-2 Form ID: '+props.form.id}
                buttons={[{
                    text: 'Approve',
                    role: 'approve',
                    icon: checkmarkCircleOutline,
                    handler: () => {
                        setStatus('approve')
                    }
                }, {
                    text: 'Reject',
                    icon: trash,
                    handler: () => {
                        setStatus('reject')
                    }
                },   {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                }]}
            >
            </IonActionSheet>
            <IonModal
                isOpen={showModal}
                onDidDismiss={()=>{
                    setShowConfirmation(false);
                    setStatus(null);
                    setComment('')
                }}
            >
                {isDone ?

                    (
                        loading ?

                            <IonGrid>
                                <IonRow className='ion-justify-content-center' style={{marginTop: '45vh'}}>
                                    <IonSpinner/>
                                </IonRow>
                            </IonGrid>
                            :
                            (
                                error ?
                                    <IonGrid>
                                        <IonRow className='ion-justify-content-center ion-margin'
                                                style={{marginTop: '45vh'}}>
                                            Sorry an error occurred. Please try again later or contact an Administrator.
                                        </IonRow>
                                    </IonGrid>
                                    :
                                    <IonGrid>
                                        <IonRow className='ion-justify-content-center ion-margin'
                                                style={{marginTop: '45vh'}}>
                                            Your action was successfully recorded!
                                        </IonRow>
                                    </IonGrid>
                            )

                    )

                    :


                    (showConfirmation ?
                            <IonGrid>
                                <IonRow style={{marginTop: '13vh'}} className='ion-justify-content-center'>
                                    <h4>Please confirm that you want to </h4>
                                </IonRow>
                                <IonRow className='ion-justify-content-center'>
                                    <h4><strong>{status}</strong></h4>
                                </IonRow>
                                <IonRow className='ion-justify-content-center'>
                                    <h4>EPET-2 Form ID: {props.form.id}</h4>
                                </IonRow>
                                <IonRow className='ion-margin ion-justify-content-center'>
                                    <IonButton onClick={handleSubmit}>
                                        Confirm & Submit
                                    </IonButton>
                                </IonRow>
                            </IonGrid>
                            :
                            <IonGrid>
                                <IonRow style={{marginTop: '13vh'}} className='ion-margin'>
                                    <strong>You are about to {status} the EPET-2 Form ID: {props.form.id}</strong>
                                </IonRow>
                                <IonRow className='ion-margin'>
                                    <IonTextarea
                                        placeholder="Please write a comment"
                                        rows={6}
                                        onIonChange={(event) => setComment(event.target.value)}
                                    />
                                </IonRow>
                                <IonRow className='ion-margin ion-justify-content-center'>
                                    <IonButton disabled={comment === ''} onClick={() => setShowConfirmation(true)}>
                                        Add Comment & Continue&nbsp;<IonIcon icon={arrowDropright}/>
                                    </IonButton>
                                </IonRow>
                            </IonGrid>
                    )
                }
                {
                    isDone ?
                        (
                            loading ?
                                <></>
                                :
                                <IonButton onClick={handleClose} color='primary'>Close</IonButton>
                        )

                        :

                        <IonButton onClick={handleClose} color='secondary'>Cancel</IonButton>
                }

            </IonModal>
            <IonActionSheet
                isOpen={viewAlert}
                onDidDismiss={() => setViewAlert(false)}
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


export default withRouter(Epets2ReviewCard)