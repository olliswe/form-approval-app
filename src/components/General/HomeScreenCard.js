import React, {useContext} from "react";
import {IonAvatar, IonCard, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow} from "@ionic/react";
import {arrowDropright} from "ionicons/icons";
import {withRouter} from "react-router";
import {UserContext} from "../../context/auth";


const HomeScreenCard = (props) => {

    const userContext = useContext(UserContext)
    const user = userContext.state.user

    const getStatus = (status) => {

        if (status==='pending-review'){
            return ('Awaiting review')
        }
        else if (status==='awaiting-submission'){
            return ('Awaiting submission to MoF')
        }
        else if (status==='awaiting-ifmis'){
            return ('Awaiting IFMIS entry')
        }
        else if (status==='completed'){
            return ('Entered into IFMIS')
        }
        else if (status==='rejected'){
            return ('Sent back to MDA')
        }
    }

    const handleLink = (name, status) => {

        if (name==='Awaiting your review'){
            if (user.category === 'Minister'){
                props.history.push('/mof/review')
            }
            else if (user.category === 'Financial Secretary'){
                props.history.push('/fs/review')
            }
            else if (user.category === 'Minister (MDA)'){
                props.history.push('/mdamin/epets1/review')
            }
        }

        else if (status==='pending-review'){
            props.history.push('/view_review',{category:name})
        }
        else if (status === 'awaiting-submission'){
            props.history.push('/view_awaiting_submission')
        }
        else if (status === 'awaiting-ifmis'){
            props.history.push('/view_awaiting_ifmis')
        }
        else if (status === 'completed'){
            props.history.push('/view_completed')
        }
        else if (status === 'rejected'){
            props.history.push('/view_rejected')
        }

    }

    return (

        <IonCard style={{width:'100%'}} onClick={()=>handleLink(props.name, props.status)}>
            <IonItem>
                <IonAvatar slot="start">
                    <img src={"assets/images/"+props.status+'.png'} alt=""/>
                </IonAvatar>
                <IonLabel>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='10.5'>
                                <IonRow style={{fontSize:'1.0em'}}>
                                    <strong>{props.name}</strong>
                                </IonRow>
                                <IonRow>
                                    {getStatus(props.status)}
                                </IonRow>
                            </IonCol>
                            <IonCol size='1.5' className='ion-align-self-center' style={{fontSize:'1.1em'}}>
                                {props.count}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonLabel>
                <IonIcon slot="end" icon={arrowDropright}/>
            </IonItem>
        </IonCard>
    )
}


export default withRouter(HomeScreenCard)