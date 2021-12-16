import React, {useState, useEffect} from "react"
import { useHistory } from "react-router-dom"


export const ProjectCreateForm = () => {
    const [project, setProject] = useState({})
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState()
    const [customers, setCustomers] = useState({})
    const [customerId, setCustomerId] = useState()
    const history = useHistory()

    const renderEmployee = () => {
        return fetch("https://meta-info-server.herokuapp.com/employees",
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                setEmployees(data)
            })
    }

    const renderCustomers = () => {
        return fetch("https://meta-info-server.herokuapp.com/customers",
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                setCustomers(data)
            })
    }

    useEffect(
        () => {
            renderEmployee()
            renderCustomers()
        }, []
    )

    const updateEmployee = (evt) => {
        
        setEmployeeId(evt.target.value)
    }

    const updateCustomer = (evt) => {
        
        setCustomerId(evt.target.value)
    }

    const submitForm = (event) => {
        event.preventDefault()
  
          const projectObject = {
            employee_id: parseInt(employeeId),
            customer: parseInt(customerId),
            description: project.description,
            budget: parseInt(project.budget),
            start: project.start,
            expected_completion: project.expected_completion,
            is_completed: false
          }
  
  
          const fetchOption = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "authorization": `Token ${localStorage.getItem("meta_customer")}`
              },
              body: JSON.stringify(projectObject)
          }
          
          return fetch("https://meta-info-server.herokuapp.com/projects", fetchOption)
              .then(() => history.push("/projects"))
      }

    return (
        <>
            <form className="projectCreateForm">
            <div className="projectCreateForm--h2"><h1 className="projectCreateForm__title">New project Form</h1></div>
                <div><img src="" /></div>
             
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Employee:</label>
                    <select onChange = {updateEmployee}>
                    <option>select employee</option>
                    {employees.length > 0?employees?.map(employee => {
                        return( <option value ={employee.id}>{employee.name}</option>)}
                        ): ""}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Customer:</label>
                    <select onChange = {updateCustomer}>
                    <option>select employee</option>
                    {customers.length > 0?customers?.map(customer => {
                        return( <option value ={customer.id}>{customer.name}</option>)}
                        ): ""}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.description = event.target.value
                                setProject(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Budget:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.budget = event.target.value
                                setProject(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Start Date:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="date"
                        className="form-control-stock"
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.start = event.target.value
                                setProject(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Expected Completion Date:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="date"
                        className="form-control-stock"
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.expected_completion = event.target.value
                                setProject(copy)
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