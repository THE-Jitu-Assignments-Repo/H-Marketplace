import React from 'react'

function Navbar() {
    return (
        <footer className='navbar'>
            <nav className="navbarBav">
                <ul className="navbarListItems">
                    <li className="navbarListItem">
                        <ExploreIcon fill="#2c2c2c" width="36px" height="36px" />
                        <p>Explore</p>
                    </li>
                     <li className="navbarListItem">
                        <ExploreIcon fill="#2c2c2c" width="36px" height="36px" />
                        <p>offer</p>
                    </li>
                     <li className="navbarListItem">
                        <PersonOutlineIcon fill="#2c2c2c" width="36px" height="36px" />
                        <p>profile</p>
                    </li>

                </ul>
            </nav>
            
        </footer>
    )
}

export default Navbar
