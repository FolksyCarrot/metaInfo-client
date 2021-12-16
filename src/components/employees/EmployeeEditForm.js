import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"


export const EmployeeEditForm = () => {
    const [employee, getEmployee] = useState({})
    const [updateEmployee, update] = useState({})
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
            name: updateEmployee.name,
            position: updateEmployee.position,
            salary: updateEmployee.salary
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
            <div className="employeeCreateForm--h2"><h1 className="employeeCreateForm__title">Employee Edit Form</h1></div>
                <div><img src="" /></div>
             
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="Name"
                        defaultValue={employee.name}
                        onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.name = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Position:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="Position"
                        defaultValue={employee.position}
                        onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.position = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Salary:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="salary"
                        defaultValue={employee.salary}
                        onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.salary = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary employeeCreateForm--button" onClick={submitForm}>
                Submit Form
            </button>
        </form>
        </>
    )
}