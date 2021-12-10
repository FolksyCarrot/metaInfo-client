import React, { useEffect, useState} from "react"


export const Employees = () => {
    const [employees, setEmployees] = useState([])

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

    
}