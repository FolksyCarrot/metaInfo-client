import React from "react"
import { Route } from "react-router-dom"
import { CostCreateForm } from "./costs/CostCreateForm"
import { CostEditForm } from "./costs/CostEditForm"
import { CustomerCreateForm } from "./customers/CustomerCreateForm"
import { CustomerEditForm } from "./customers/CustomerEditForm"
import { Customers } from "./customers/Customers"
import { EmployeeCreateForm } from "./employees/EmployeeCreateForm"
import { EmployeeEditForm } from "./employees/EmployeeEditForm"
import { Employees } from "./employees/Employees"
import { ProjectCreateForm } from "./projects/ProjectCreateForm"
import { ProjectDetails } from "./projects/ProjectDetails"
import { ProjectEditForm } from "./projects/ProjectEditForm"
import { Projects } from "./projects/Projects"


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
            <Route exact path="/projects">
                <Projects/>  
            </Route>
            <Route exact path="/projects/projectCreateForm">
                <ProjectCreateForm/>  
            </Route>
            <Route exact path="/projects/:projectId(\d+)/details">
               <ProjectDetails />  
            </Route>
            <Route exact path="/projects/:projectId(\d+)/editForm">
                <ProjectEditForm />
            </Route>
            <Route exact path="/projects/:projectId(\d+)/costs/costCreateForm">
                <CostCreateForm />
            </Route>
            <Route exact path="/projects/:projectId(\d+)/costs/:costsId(\d+)/costEditForm">
                <CostEditForm /> 
            </Route>
        </div>
    )
}