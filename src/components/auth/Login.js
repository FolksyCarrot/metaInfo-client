import { Box, Button, TextField } from "@mui/material";
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
                    history.push("/home")
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

        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
                <form className="form--login" >
                    <h1 className="form--heading">Meta Info</h1>
                    <h2 className="form--heading">Please sign in</h2>
                    <TextField id="outlined-primary" sx={{marginBottom:"10px"}} className="form-control" label="Username" variant="outlined" required type="text" 
                 onChange= {evt => setUsername(evt.target.value)} />

                    <TextField id="outlined-primary" sx={{marginBottom:"10px"}} className="form-control" label="Password" variant="outlined" required type="text" 
                 onChange= {evt => set(evt.target.value)} />
                    
                    <Button variant="contained" sx={{background:"rgb(255, 166, 43)", marginTop:"7px"}} className="btn btn-primary employeeCreateForm--button" onClick={handleLogin} >
                Submit Form
                    </Button>

                </form>
            </Box>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
        </main>
        </body>
    )
}