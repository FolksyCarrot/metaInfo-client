import React, {useState} from "react"
import { useHistory } from "react-router-dom"


export const CustomerCreateForm = () => {
    const [customer, setCustomer] = useState({})
    const history = useHistory()

    const submitForm = (event) => {
        event.preventDefault()
  
          const customerObject = {
              name: customer.name,
          }
  
  
          const fetchOption = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "authorization": `Token ${localStorage.getItem("meta_customer")}`
              },
              body: JSON.stringify(customerObject)
          }
          
          return fetch("http://localhost:8000/customers", fetchOption)
              .then(() => history.push("/customers"))
      }

    return (
        <>
            <form className="customerCreateForm">
            <div className="customerCreateForm--h2"><h1 className="customerCreateForm__title">New Customer Form</h1></div>
                <div><img src="" /></div>
             
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        onChange= {
                            (event) => {
                                const copy = {...customer}
                                copy.name = event.target.value
                                setCustomer(copy)
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