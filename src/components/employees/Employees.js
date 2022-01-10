import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { Button } from "@mui/material";
import "./employees.css"

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
            <div class="employee-div">
            <h2 className="employees-font">Employees</h2>
            <Button variant="contained" sx={{background:"rgb(255, 166, 43)", marginBottom: "15px"}} onClick ={
                () => history.push("employees/employeeCreateForm")
            }>Add Employee</Button>
            {employees.length > 0 ? employees.map(
                (employee) => {
                    return (
                        <>
                            <div className="employees-font">Name: {employee.name}</div><div className="employees-font">Position: {employee.position}</div><div className="employees-font">Salary: ${employee.salary}</div>
                            <Button variant="outlined" sx={{color:"black", marginTop: "15px", borderColor: "rgb(255, 166, 43)"}} onClick = {
                                () => history.push(`/employees/${employee.id}/editForm`)
                            }>Edit</Button>
                        </>
                    )
                }
                ): ""}
                </div>
        </>
    )
}