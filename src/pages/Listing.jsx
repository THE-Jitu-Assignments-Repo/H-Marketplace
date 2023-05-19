import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../config/firebase.config'
import Spinner from '../component/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'


function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading]= useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const params = useParams()
    const navigate = useNavigate()
    const auth = getAuth()

    useEffect(()=>{
        const fetchListing = async()=>{
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                console.log(docSnap.data());
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])


    return (
        <main>
            {/* Sliders */}
            <div className="shareIconDiv" onClick={()=>{
                navigator.clipboard.writeText(window.location.href)
                // http://localhost:5173/category/rent/qeTmIoLEwwaTrgvzl3iT
                setShareLinkCopied(true)
                setTimeout(()=>{
                    setShareLinkCopied(false)
                }, 2000)
            }}>
                <img src={shareIcon} alt="" />
            </div>
            {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}
        </main>
    )
}

export default Listing
