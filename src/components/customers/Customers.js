import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"


export const Customers = () => {
    const [customers, setCustomers] = useState([])
    const history = useHistory()

    const render = () => {
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
            render()
        }, []
    )

    return (
        <>
            <h2>Customers</h2>
            <button onClick ={
                () => history.push("customers/customerCreateForm")
            }>Add Customer</button>
            {customers.length > 0 ? customers.map(
                (customer) => {
                    return (
                        <>
                            <div>Name of Customer: {customer.name}</div>
                            <button onClick = {
                                () => history.push(`/customers/${customer.id}/editForm`)
                            }>Edit</button>
                        </>
                    )
                }
                ): ""}
        </>
    )
}