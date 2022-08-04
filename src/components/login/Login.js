import React, { useState } from 'react'
import Axios from '../../Axios'
import "./Login.css"

function Login(props) {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const loginHandler = (event) => {
    event.preventDefault()
    let payload = {
      email: email,
      password: password
    }
    console.log(email + " " + password)
    Axios.post("usermanagement/login",payload)
      .then(data => {
        if (data != null) {
          localStorage.setItem("token", data.data.jwt)
          localStorage.setItem("loggedIn", true)
          localStorage.setItem("email", email)
          props.history.push("/users")
        }
      })
      .catch(err => {
        console.log(err)
        alert(err.response.data.message)
      })
  }

  let form = (<div className='container'>
    <form id="contact" action="" method="post">
      <fieldset>
        <input placeholder="Your Email" type="email" tabIndex="1" required autoFocus onChange={(event) => setEmail(event.target.value)} />
      </fieldset>
      <fieldset>
        <input placeholder="Your Password" type="password" tabIndex="2" required onChange={(event) => setPassword(event.target.value)} />
      </fieldset>
      <fieldset>
        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending" onClick={(event) => loginHandler(event)}>Login</button>
      </fieldset>
    </form>
  </div>)

  return (
    <div>{form}</div>
  )
}

export default Login