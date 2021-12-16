import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [password, set] = useState("")
    const [username, setUsername] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("https://meta-info-server.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("meta_customer", res.token)
                    history.push("/")
                }
                else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <body className="login--body">
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="form--heading">Meta Info</h1>
                    <h2 className="form--heading">Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Username </label>
                        <input type="text"
                            onChange={evt => setUsername(evt.target.value)}
                            className="form-control"
                            placeholder="User name"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputEmail"> Password </label>
                        <input type="text"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Password"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
        </main>
        </body>
    )
}