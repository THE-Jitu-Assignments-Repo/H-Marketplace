import React, { useEffect, useState } from 'react'
import {getAuth} from 'firebase/auth'

function Profile() {
    const [user, setUser]=useState(null)
    const auth = getAuth()
    useEffect(()=>{
        setUser(auth.currentUser)
    },[])

    return user ?  (
        <div>
            <h2>{user.displayName}</h2>
        </div>
    ): <p>Loading ...</p>
}

export default Profile
