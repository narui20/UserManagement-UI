import React from 'react'
import { Redirect } from 'react-router'

function Logout(props) {
    
    localStorage.removeItem("token")
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("email")
    return (
        <div>
            <Redirect to="/login"/>
        </div>
    )
}

export default Logout