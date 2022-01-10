import { Box, Button, TextField } from "@mui/material"
import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import "./employees.css"

export const EmployeeEditForm = () => {
    const [employee, getEmployee] = useState({})
    const history = useHistory()
    const {employeeId} = useParams()

    const render = () => {
        return fetch(`https://meta-info-server.herokuapp.com/employees/${employeeId}`,
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}})
            .then(res => res.json())
            .then((data) => {
                getEmployee(data)
            })
    }

    useEffect(
        () => {
            render()
        },
        []
    )

    const submitForm = (event) => {
        event.preventDefault()

        const employeeObject = {
            name: employee.name,
            position: employee.position,
            salary: employee.salary
        }

        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("meta_customer")}`
            },
            body: JSON.stringify(employeeObject)
        }
        
        return fetch(`https://meta-info-server.herokuapp.com/employees/${employeeId}`, fetchOption)
            .then(() => history.push("/employees"))
    }

    return (
        <>
            <form className="employeeCreateForm">
            <div className="employee-div"><h1 className="employees-font">Employee Edit Form</h1>
                
             
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        
      <TextField id="outlined-primary" label="Name" variant="outlined" required value={employee.name} 
 onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.name = event.target.value
                                getEmployee(copy)
                            }

                        } />
      <TextField id="outlined-basic" label="Position" variant="outlined" required  value={employee.position} onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.position = event.target.value
                                getEmployee(copy)
                            }

                        } />

      <TextField id="outlined-basic" label="Salary" variant="outlined" required value={employee.salary}  onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.salary = event.target.value
                                getEmployee(copy)
                            }

                        } />
      
    </Box>
            
            
            <Button variant="contained" sx={{background:"rgb(255, 166, 43)", marginTop:"7px"}} className="btn btn-primary employeeCreateForm--button" onClick={submitForm}>
                Submit Form
            </Button>
            </div>
        </form>
        </>
    )
}