import React, { useState } from 'react'
import Axios from '../../Axios'
import "./SignIn.css"

function SignIn(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signInHandler = (event) => {
        event.preventDefault();
        if (name !== "" && email !== "" && password !== "") {

            let payload = {
                name: name,
                email: email.trim(),
                password: password
            }
            Axios.post("usermanagement/register", payload)
                .then(resp => {
                    console.log(resp)
                    if (resp.data === "") {
                        alert("User with given username already exists");
                    } else {
                        setEmail("")
                        setName("")
                        setPassword("")
                        alert("User created");
                    }
                }).catch(err => {
                    console.log(err)
                    alert(err.response.message)
                })
        } else {
            alert("Fields are empty")
        }
    }

    let form = (<div className='container'>
        <form id="contact" action="" method="post">
            <fieldset>
                <input placeholder="Your Name" type="text" tabIndex="3" value={name} required autoFocus onChange={(event) => setName(event.target.value)} />
            </fieldset>
            <fieldset>
                <input placeholder="Your Email" type="email" tabIndex="1" value={email} required autoFocus onChange={(event) => setEmail(event.target.value)} />
            </fieldset>
            <fieldset>
                <input placeholder="Your Password" type="password" tabIndex="2" value={password} required onChange={(event) => setPassword(event.target.value)} />
            </fieldset>
            <fieldset>
                <button name="submit" type="submit" id="contact-submit" data-submit="...Sending" onClick={(event) => signInHandler(event)}>SignIn</button>
            </fieldset>
        </form>
    </div>)

    return (
        <div>{form}</div>
    )
}

export default SignIn