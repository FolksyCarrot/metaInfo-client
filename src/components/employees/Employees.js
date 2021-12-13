import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"


export const Employees = () => {
    const [employees, setEmployees] = useState([])
    const history = useHistory()

    const render = () => {
        return fetch("http://localhost:8000/employees",
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
            <button onClick ={
                () => history.push("employees/employeeCreateForm")
            }>Add Employee</button>
            {employees.length > 0 ? employees.map(
                (employee) => {
                    return (
                        <>
                            <div>Name: {employee.name}</div><div>Position: {employee.position}</div><div>Salary: ${employee.salary}</div>
                            <button onClick = {
                                () => history.push(`/employees/${employee.id}/editForm`)
                            }>Edit</button>
                        </>
                    )
                }
                ): ""}
        </>
    )
}