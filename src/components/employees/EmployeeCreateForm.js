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
          
          return fetch("http://localhost:8000/employees", fetchOption)
              .then(() => history.push("/employees"))
      }

    return (
        <>
            <form className="employeeCreateForm">
            <div className="employeeCreateForm--h2"><h1 className="employeeCreateForm__title">New Employee Form</h1></div>
                <div><img src="" /></div>
             
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="Name"
                        onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.name = event.target.value
                                setEmployee(copy)
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
                        onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.position = event.target.value
                                setEmployee(copy)
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
                        onChange= {
                            (event) => {
                                const copy = {...employee}
                                copy.salary = event.target.value
                                setEmployee(copy)
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