import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>
                <form>
                    <input type="email" className='eailInput' placeholder='Email' id='email' value={email} onChange={onChage} />
                </form>
            </div>
        </>
    )
}

export default SignIn
