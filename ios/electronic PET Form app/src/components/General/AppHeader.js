import React from 'react'
import {IonButton, IonButtons, IonHeader, IonIcon, IonMenuToggle, IonTitle, IonToolbar} from '@ionic/react';
import {contact} from 'ionicons/icons';
import {withRouter} from "react-router";

const AppHeader = (props) => {

    const [disabled, setIsDisabled] = React.useState(true)

    React.useEffect(() => {
        setIsDisabled(props.location.pathname === '/login')
    }, [props.location])




    return (
        <IonHeader>
            <IonToolbar color='primary' mode='md'>
                <IonButtons slot='start'>
                    <IonButton onClick={()=>{props.history.push('/')}}>
                        <img src='/assets/images/logo.png' style={{height:'30px'}}/>
                    </IonButton>
                </IonButtons>
                <IonTitle>
                    e-PET Portal
                </IonTitle>
                <IonButtons slot='end'>
                    <IonMenuToggle menu='main'>
                        <IonButton>
                            <IonIcon className='ion-text-end' icon={contact}/>
                        </IonButton>
                    </IonMenuToggle>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}


export default withRouter(AppHeader)