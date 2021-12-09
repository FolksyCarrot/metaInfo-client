import React, { useRef, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [manager, setManager] = useState({})
    const [stores, setStores] = useState([])
    const conflictDialog = useRef()

    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://localhost:8000/login`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8000/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(manager)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("meta_customer", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const storeRender = () => {
        fetch("http://localhost:8000/stores")
        .then(res => res.json())
        .then(data => setStores(data))
    }

    useEffect(
        () => {
            storeRender()
        },
        []
    )

    const updateManager = (evt) => {
        const copy = {...manager}
        copy[evt.target.id] = evt.target.value
        setManager(copy)
    }


    return (
        <main className="register--main"style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal" id="please--register">Please Register</h1>
                <fieldset>
                    <label htmlFor="username"> User Name </label>
                    <input onChange={updateManager}
                           type="text" id="username" className="form-control"
                           placeholder="Enter a user name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateManager} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateManager} type="text" id="password" className="form-control" placeholder="password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateManager} type="text" id="first_name" className="form-control" placeholder="password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateManager} type="text" id="last_name" className="form-control" placeholder="password" required />
                </fieldset>
                <select  id ="store_id" onChange = {updateManager}>
                    <option>select company</option>
                    {stores.length > 0?stores?.map(store => {
                        return( <option value ={store.id}>{store.name}</option>)}
                        ): ""}
                </select>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}