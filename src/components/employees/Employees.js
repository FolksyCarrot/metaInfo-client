import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"


export const Employees = () => {
    const [employees, setEmployees] = useState([])
    const history = useHistory()

    const render = () => {
        return fetch("http://localhost:8000/employees")
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
            {employees.map(
                (employee) => {
                    return (
                        <>
                            <div>{employee.name}</div><div>{employee.position}</div><div>{employee.salary}</div>
                            <button onClick = {
                                () => history.push(`/employee/${employee.id}/editform`)
                            }>Edit</button>
                        </>
                    )
                }
                )}
        </>
    )
}