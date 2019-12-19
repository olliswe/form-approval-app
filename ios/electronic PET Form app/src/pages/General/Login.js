import React, {useContext, useEffect, useState} from 'react';
import {IonButton, IonContent, IonGrid, IonImg, IonInput, IonPage, IonRow, IonSpinner} from '@ionic/react';
import {UserContext} from "../../context/auth";
import axios from 'axios';
import {useKeyPress} from "../../components/General/useKeyPress";


const Login = (props) => {

    let userContext = useContext(UserContext);


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const enterPress = useKeyPress('Enter');

    const login = () => {
        setLoading(true)
        setError(false)
        let body = {
            username:email,
            password:password
        }
        axios.post(process.env.REACT_APP_API_URL+'/api-token-auth/',body)
            .then(res=>{
                userContext.dispatch({ type: "login", payload:{user:res.data.user,token:res.data.token} })
            })
            .catch(error=>{
                setError(true)
                setLoading(false)
            })
    }

    useEffect(()=> {
            if (enterPress) {
                login()
            }
        }
        , [enterPress]
    )




    const handleLogin = (event) =>{
        event.preventDefault()
        login()
    }


    return (
        <IonPage className="lightBackground">
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow className='ion-justify-content-center' style={{marginTop:'13vh'}}>
                        <h1>e-PET Portal App</h1>
                    </IonRow>

                    <IonRow className='ion-justify-content-center' style={{marginTop:'2vh'}}>
                        <IonImg className='signInLogo' src='assets/images/logo.png'/>
                    </IonRow>
                    <form onSubmit={handleLogin}>
                        <IonRow className='ion-justify-content-center' style={{marginTop:'5vh'}}>
                            <IonInput
                                className='ion-justify-content-center'
                                placeholder="Email"
                                type="email"
                                onIonChange={(event)=>setEmail(event.target.value)}
                                value={email}
                            >
                            </IonInput>
                        </IonRow>
                        <IonRow className='ion-justify-content-center' style={{marginTop:'1vh'}} >
                            <IonInput
                                placeholder="Password"
                                type="password"
                                onIonChange={(event)=>setPassword(event.target.value)}
                                value={password}
                            >
                            </IonInput>
                        </IonRow>
                        {
                            loading ?
                                <IonButton expand='block' style={{marginTop:'5vh'}}><IonSpinner/></IonButton>
                                :
                                <IonButton expand='block' type='submit' style={{marginTop:'5vh'}}>Login</IonButton>
                        }
                    </form>
                    {error &&
                    <IonRow className='ion-justify-content-center' style={{marginTop:'2vh'}} >
                        Your email and password didn't match. Please try again.
                    </IonRow>
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login