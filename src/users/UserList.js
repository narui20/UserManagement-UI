import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Axios from '../Axios'
import { getToken } from '../components/Token'
import "./UserList.css"

function UserList(props) {
    const [users, setUsers] = useState([])
    const [header, setHeader] = useState([])
    const [name, setName] = useState()
    const headerToken = getToken()
    console.log(headerToken)

    useEffect(() => {
        Axios.get("/user/getusers", headerToken)
            .then(resp => {
                if (resp.data) {
                    setUsers(resp.data)
                    const header = Object.keys(resp.data[0])
                    header.push("Action")
                    setHeader(header)

                }
            }).catch(err => {
                if (err.response.status === 403) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("loggedIn")
                    localStorage.removeItem("email")
                    props.history.push("/login")
                }
            })

    }, [props.modified])

    const handleDelete = (id) => {
        console.log(id)
        Axios.post("/user/deleteuser/" + id, null, headerToken)
            .then(resp => {
                console.log(resp)
                props.modifyValue(id)
            }).catch(err => {
                if (err.response.status === 403) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("loggedIn")
                    localStorage.removeItem("email")
                    props.history.push("/login")
                }
                alert(err.message)
            }
            )
    }

    const handleEdit = (id) => {
        let payload = {
            name: name,
            id: id
        }

        console.log(payload)

        Axios.put("/user/updateuser", payload, headerToken)
            .then(resp => {
                console.log(resp)
                props.modifyValue(id)
            }).catch(err => {
                if (err.response.status === 403) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("loggedIn")
                    localStorage.removeItem("email")
                    props.history.push("/login")
                }
                alert(err.message)
            }
            )
    }

    const table = (
        <Fragment>
            <table className='table__main'>
                <thead>
                    {header.filter(val => val !== "password").map((value,key) => (
                        <th key = {key} className="header"> {value.toUpperCase()}</th>
                    ))}
                </thead>
                <tbody>
                    {users.map(values => {
                        return (
                            <tr key={values["id"]}>
                                {header.filter(val => val !== "password").map((val,key) => (
                                    val !== "Action" ?
                                        (val === "name" ?
                                            <td key={key} contentEditable={true} onInput={(event) => setName(event.currentTarget.textContent)} className="data">{values[val]}</td> :
                                            <td key={key} className="data">{values[val]}</td>) :
                                        <td key={key} className="data">
                                            <div className='button__main'>
                                                <button className='button__edit' disabled={values["email"] === localStorage.getItem("email")} onClick={() => handleEdit(values["id"])}>Edit</button>
                                                <button className='button__delete' disabled={values["email"] === localStorage.getItem("email")} onClick={() => handleDelete(values["id"])}>Delete</button>
                                            </div>
                                        </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    )

    return (
        <div>{table}</div>
    )
}

const mapStateToProps = state => {
    return {
        modified: state && state.modified
    }
}

const mapDispatchToProps = dispatch => {
    return {
        modifyValue: (value) => dispatch({ type: "MODIFY", value: value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)