import React from 'react'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import  { ReactComponent as ExploreIcon}  from '../assets/svg/exploreIcon.svg'
import  { ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'
import { useNavigate } from 'react-router-dom'



function Navbar() {
    const navigate = useNavigate()
    return (
        <footer className='navbar'>
            <nav className="navbarNav">
                <ul className="navbarListItems">
                    <li className="navbarListItem">
                        <ExploreIcon fill="#2c2c2c" width="36px" height="36px" onClick={()=> navigate('/')} />
                        <p>Explore</p>
                    </li>
                     <li className="navbarListItem">
                        <OfferIcon fill="#2c2c2c" width="36px" height="36px" onClick={()=> navigate('/offers')}/>
                        <p>offer</p>
                    </li>
                     <li className="navbarListItem">
                        <PersonOutlineIcon fill="#2c2c2c" width="36px" height="36px" onClick={()=> navigate('/profile')}/>
                        <p>profile</p>
                    </li>

                </ul>
            </nav>
            
        </footer>
    )
}

export default Navbar
