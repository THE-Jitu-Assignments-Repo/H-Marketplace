import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react';
import { useEffect } from 'react';
function useAuthStatus() {
    const [loggedIn, setLoggedIn]= useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)


    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    })

    return {loggedIn, checkingStatus}
}

export default useAuthStatus
