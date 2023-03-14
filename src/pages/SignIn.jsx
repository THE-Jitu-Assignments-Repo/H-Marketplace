import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/visibilityIcon.svg'

function SignIn() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div>
            <h1>Login</h1>
        </div>
    )
}

export default SignIn
