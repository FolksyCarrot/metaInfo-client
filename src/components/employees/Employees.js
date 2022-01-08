import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { Button } from "@mui/material";

export const Employees = () => {
    const [employees, setEmployees] = useState([])
    const history = useHistory()

    const render = () => {
        return fetch("https://meta-info-server.herokuapp.com/employees",
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                setEmployees(data)
            })
    }

    useEffect(
        () => {
            render()
        }, []
    )

    return (
        <>
            <h2>Employees</h2>
            <Button variant="contained" sx={{background:"rgb(62, 199, 185)", marginBottom: "15px"}} onClick ={
                () => history.push("employees/employeeCreateForm")
            }>Add Employee</Button>
            {employees.length > 0 ? employees.map(
                (employee) => {
                    return (
                        <>
                            <div>Name: {employee.name}</div><div>Position: {employee.position}</div><div>Salary: ${employee.salary}</div>
                            <Button variant="outlined" sx={{color:"rgb(62, 199, 185)", marginTop: "15px"}} onClick = {
                                () => history.push(`/employees/${employee.id}/editForm`)
                            }>Edit</Button>
                        </>
                    )
                }
                ): ""}
        </>
    )
}