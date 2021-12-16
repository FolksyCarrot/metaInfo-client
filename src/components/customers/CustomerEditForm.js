import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"


export const CustomerEditForm = () => {
    const [customer, getCustomer] = useState({})
    const [updateCustomer, update] = useState({})
    const history = useHistory()
    const {customerId} = useParams()

    const render = () => {
        return fetch(`https://meta-info-server.herokuapp.com/customers/${customerId}`,
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}})
            .then(res => res.json())
            .then((data) => {
                getCustomer(data)
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

        const customerObject = {
            name: updateCustomer.name
        }

        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("meta_customer")}`
            },
            body: JSON.stringify(customerObject)
        }
        
        return fetch(`https://meta-info-server.herokuapp.com/customers/${customerId}`, fetchOption)
            .then(() => history.push("/customers"))
    }

    return (
        <>
            <form className="customerCreateForm">
            <div className="customerCreateForm--h2"><h1 className="customerCreateForm__title">Customer Edit Form</h1></div>
                <div><img src="" /></div>
             
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="Name"
                        defaultValue={customer.name}
                        onChange= {
                            (event) => {
                                const copy = {...customer}
                                copy.name = event.target.value
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