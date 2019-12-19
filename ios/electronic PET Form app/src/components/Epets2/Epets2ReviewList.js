import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {UserContext} from "../../context/auth";
import {IonList, useIonViewWillEnter,} from "@ionic/react";
import FormCardSkeleton from "../General/FormCardSkeleton";

const Epets2ReviewList = (props) => {

    let userContext = useContext(UserContext)
    let token = userContext.state.token

    const [forms, setForms] = useState(null);
    const [loading, setLoading] = useState(true)

    const handleLoad = () => {
        setLoading(true)
        axios.get(process.env.REACT_APP_API_URL+'/epet2form-review', {headers:{'Authorization':'Token '+token}})
            .then(res=>{
                setForms(res.data)
                setLoading(false)
            })
    }

    useEffect(()=>{
        console.log(props.refresh)
        if (props.refresh){
            handleLoad()
        }
    }, [props.refresh])




    useIonViewWillEnter(()=>{
        handleLoad()
    })


    return(
        <>
            <h4 className='ion-margin'>e-PET 2 Forms pending your review</h4>
            <IonList>
                {
                    loading ?
                        <>
                            <FormCardSkeleton/>
                            <FormCardSkeleton/>
                            <FormCardSkeleton/>
                        </>
                        :
                        (forms.length===0?
                                <h5 className='ion-margin'>There are no forms to review</h5>
                                :

                                forms.map((form) => (
                                    React.cloneElement(props.children, {
                                        form: form,
                                        getBody: props.getBody,
                                        handleLoad: handleLoad
                                    })
                                ))
                        )
                }
            </IonList>
        </>
    )
}

export default Epets2ReviewList