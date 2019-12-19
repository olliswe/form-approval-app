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
            return ('Awaiting submission to AGD')
        }
        else if (status==='awaiting-ifmis'){
            return ('Awaiting IFMIS entry')
        }
    }



        const handleLink = (name, status) => {


        if (name==='Awaiting your review'){
            props.history.push('/mdamin/epets2/review')

        }
       else if (status==='pending-review'){
            props.history.push('/view_epets2_review',{category:name})
        }
       else if (status ==='awaiting-ifmis'){
           props.history.push('/view_epets2_awaiting_ifmis')
        }
        else if (status ==='awaiting-submission'){
            props.history.push('/veiew_epets2_awaiting_submission')
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