import React from 'react'
import {IonAvatar, IonCard, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonSkeletonText} from "@ionic/react";
import {arrowDropright} from "ionicons/icons";


const HomeScreenCardSkeleton = (props) => {

    return (
        <IonCard style={{width:'100%'}}>
            <IonItem>
                <IonAvatar slot="start">
                    <IonSkeletonText animated />
                </IonAvatar>
                <IonLabel>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='10.5'>
                                <IonRow>
                                    <IonSkeletonText animated style={{ width: '100%' }} />
                                </IonRow>
                                <IonRow>
                                    <IonSkeletonText animated style={{ width: '80%' }} />
                                </IonRow>
                            </IonCol>
                            <IonCol size='1.5' className='ion-align-self-center' style={{fontSize:'1.1em'}}>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonLabel>
                <IonIcon slot="end" icon={arrowDropright}/>
            </IonItem>
        </IonCard>
    )
}

export default HomeScreenCardSkeleton