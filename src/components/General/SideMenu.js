import React from 'react'
import {IonButton, IonContent, IonGrid, IonItem, IonList, IonMenu, IonRow} from '@ionic/react';
import {withRouter} from 'react-router'
import {UserContext} from '../../context/auth'


const SideMenu = (props) => {

    const [isDisabled,setIsDisabled] = React.useState(true)

    let userContext = React.useContext(UserContext)

    React.useEffect(() => {
        setIsDisabled(props.location.pathname === '/login')
    }, [props.location])

    const handleLogout = (event) =>{
        event.preventDefault()
        userContext.dispatch({ type: "logout"})
    }


    return (
        <IonMenu contentId="main" menuId="main" type="overlay" side='end' disabled={isDisabled}>
            <IonContent>
                <IonGrid className='ion-padding'>
                    {userContext.state.user && (!!userContext.state.user.email &&
                        <>
                            <IonRow>
                                <h3>Currently signed in is as:</h3>
                            </IonRow>
                            <IonList>
                                <IonItem>{userContext.state.user.email}</IonItem>
                                <IonItem>{userContext.state.user.full_name}</IonItem>
                                <IonItem>{userContext.state.user.category}</IonItem>
                            </IonList>
                            <hr/>
                            <IonRow>
                                <IonButton onClick={handleLogout} color='danger'>Logout</IonButton>
                            </IonRow>
                        </>
                    )
                    }
                </IonGrid>
            </IonContent>
        </IonMenu>
    )
}


export default withRouter(SideMenu)