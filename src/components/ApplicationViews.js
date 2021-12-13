import React from "react"
import { Route } from "react-router-dom"
import { CustomerCreateForm } from "./customers/CustomerCreateForm"
import { CustomerEditForm } from "./customers/CustomerEditForm"
import { Customers } from "./customers/Customers"
import { EmployeeCreateForm } from "./employees/EmployeeCreateForm"
import { EmployeeEditForm } from "./employees/EmployeeEditForm"
import { Employees } from "./employees/Employees"


export const ApplicationViews = () => {
    return(
        <div id="main--container">
            <Route exact path="/employees">
                <Employees />
            </Route>
            <Route exact path="/employees/employeeCreateForm">
                <EmployeeCreateForm />
            </Route>
            <Route exact path="/employees/:employeeId(\d+)/editForm">
                <EmployeeEditForm />
            </Route>
            <Route exact path="/customers">
                <Customers />
            </Route>
            <Route exact path="/customers/customerCreateForm">
                <CustomerCreateForm />
            </Route>
            <Route exact path="/customers/:customerId(\d+)/editForm">
                <CustomerEditForm/>  
            </Route>
        </div>
    )
}