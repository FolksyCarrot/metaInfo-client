import { Box, Button, TextField } from "@mui/material"
import React, { useRef, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [manager, setManager] = useState({})
    const [stores, setStores] = useState([])
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        const checkUser = {
            username: manager.username,
            password: manager.password
        }
        return fetch(`https://meta-info-server.herokuapp.com/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkUser)
        })
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://meta-info-server.herokuapp.com/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(manager)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("token")) {
                                localStorage.setItem("meta_customer", createdUser.token)
                                history.push("/home")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const storeRender = () => {
        fetch("https://meta-info-server.herokuapp.com/stores")
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

            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <h1 className="h3 mb-3 font-weight-normal" id="please--register">Please Register</h1>
        <TextField id="username" sx={{marginBottom:"10px"}} className="form-control" label="Username" variant="outlined" required type="text" 
                 onChange= {updateManager} />
        <TextField id="email" sx={{marginBottom:"10px"}} className="form-control" label="Email" variant="outlined" required type="text" 
                 onChange= {updateManager} />
        <TextField id="password" sx={{marginBottom:"10px"}} className="form-control" label="Password" variant="outlined" required type="text" 
                 onChange= {updateManager} />
        <TextField id="first_name" sx={{marginBottom:"10px"}} className="form-control" label="First Name" variant="outlined" required type="text" 
                 onChange= {updateManager} />
        <TextField id="last_name" sx={{marginBottom:"10px"}} className="form-control" label="Last Name" variant="outlined" required type="text" 
                 onChange= {updateManager} />

    </Box>
            
                <select  id ="store_id" onChange = {updateManager}>
                    <option>select company</option>
                    {stores.length > 0?stores?.map(store => {
                        return( <option value ={store.id}>{store.name}</option>)}
                        ): ""}
                </select>
                <br></br>
                <Button variant="contained" sx={{background:"rgb(255, 166, 43)", marginTop:"7px"}} className="btn btn-primary employeeCreateForm--button" onClick={handleRegister} >
                Register
                    </Button>
                
            
        </main>
    )
}