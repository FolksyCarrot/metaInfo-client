import { Box, Button } from "@mui/material"
import TextField from '@mui/material/TextField'
import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"


export const EmployeeCreateForm = () => {
    const [employee, setEmployee] = useState({})
    const history = useHistory()


    const submitForm = (event) => {
        event.preventDefault()
  
          const employeeObject = {
              name: employee.name,
              position: employee.position,
              salary: employee.salary
          }
  
  
          const fetchOption = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "authorization": `Token ${localStorage.getItem("meta_customer")}`
              },
              body: JSON.stringify(employeeObject)
          }
          
          return fetch("https://meta-info-server.herokuapp.com/employees", fetchOption)
              .then(() => history.push("/employees"))
      }

    return (
        <>
        <div className="employeeCreateForm--h2"><h1 className="employeeCreateForm__title">New Employee Form</h1></div>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        
      <TextField id="outlined-primary" label="Name" variant="outlined" required sx={{ input: { color: 'white' }}}
 onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.name = event.target.value
                                setEmployee(copy)
                            }

                        } />
      <TextField id="outlined-basic" label="Position" variant="outlined" required sx={{ input: { color: 'white' }}} onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.position = event.target.value
                                setEmployee(copy)
                            }

                        } />

      <TextField id="outlined-basic" label="Salary" variant="outlined" required sx={{ input: { color: 'white' }}} onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.salary = event.target.value
                                setEmployee(copy)
                            }

                        } />
      
    </Box>
            
            <Button variant="contained" sx={{background:"rgb(62, 199, 185)", marginTop: "15px"}} className="btn btn-primary employeeCreateForm--button" onClick={submitForm}>
                Submit Form
            </Button>
        
        </>
    )

}