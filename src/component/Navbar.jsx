import React from 'react'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import  { ReactComponent as ExploreIcon}  from '../assets/svg/exploreIcon.svg'
import  { ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'
import { useLocation, useNavigate } from 'react-router-dom'



function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const activeRoute =(route)=>{
        if(route === location.pathname){
            return true
        }
    }
    return (
        <footer className='navbar'>
            <nav className="navbarNav">
                <ul className="navbarListItems">
                    <li className="navbarListItem">
                        <ExploreIcon fill={activeRoute('/')? "#2c2c2c" : '#8f8f8f'} width="36px" height="36px" onClick={()=> navigate('/')} />
                        <p>Explore</p>
                    </li>
                     <li className="navbarListItem">
                        <OfferIcon fill={activeRoute('/offers')? "#2c2c2c" : '#8f8f8f'} width="36px" height="36px" onClick={()=> navigate('/offers')}/>
                        <p>offer</p>
                    </li>
                     <li className="navbarListItem">
                        <PersonOutlineIcon fill={activeRoute('/profile')? "#2c2c2c" : '#8f8f8f'} width="36px" height="36px" onClick={()=> navigate('/profile')}/>
                        <p>profile</p>
                    </li>

                </ul>
            </nav>
            
        </footer>
    )
}

export default Navbar
