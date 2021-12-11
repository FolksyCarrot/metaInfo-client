import React from "react"
import { Route } from "react-router-dom"
import { Employees } from "./employees/Employees"


export const ApplicationViews = () => {
    return(
        <>
            <Route path="/employees">
                <Employees />
            </Route>
        </>
    )
}