import { Button } from "@mui/material"
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
            <Button variant="contained" sx={{background:"rgb(255, 166, 43)", marginBottom: "15px"}} onClick ={
                () => history.push("customers/customerCreateForm")
            }>Add Customer</Button>
            {customers.length > 0 ? customers.map(
                (customer) => {
                    return (
                        <>
                            <div>Name of Customer: {customer.name}</div>
                            <Button variant="outlined" sx={{color:"black", marginTop: "15px", marginBottom:"5px", borderColor:"rgb(255, 166, 43)"}} onClick = {
                                () => history.push(`/customers/${customer.id}/editForm`)
                            }>Edit</Button>
                        </>
                    )
                }
                ): ""}
        </>
    )
}