import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./Navigation.css";

const Navigation = (props) => {

    const nav = (
        !localStorage.getItem("loggedIn") ?
            <Fragment>
                <div className="navigation__div">
                    <Link className="navigation__link" to="/login">Login</Link>
                    <Link className="navigation__link" to="/signin">SignIn</Link>
                </div>
            </Fragment> :
            <Fragment>
                <div className="navigation__div">
                    <Link className="navigation__link" to="/logout">Logout</Link>
                    <Link className="navigation__link" to="/users">Users</Link>
                </div>
            </Fragment>
    )
    return (
        <div>{nav}</div>
    )
}

export default withRouter(Navigation)
