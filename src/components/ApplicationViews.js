import React from "react"
import { Route } from "react-router-dom"
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
        </div>
    )
}