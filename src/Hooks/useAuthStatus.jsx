import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
function useAuthStatus() {
    const [loggedIn, setLoggedIn]= useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)

    useEffect(()=>{
        if(isMounted){

            const auth = getAuth()
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }

        return ()=>{
            isMounted.current=false
        }
    },[isMounted])

    return [loggedIn, checkingStatus]
}

export default useAuthStatus
