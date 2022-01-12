import { Button } from "@mui/material"
import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"



export const ProjectDetails = () => {
    const [project, setProject] = useState([])
    const history = useHistory()
    const {projectId} = useParams()

    const render = () => {
        return fetch(`https://meta-info-server.herokuapp.com/projects/${projectId}`,
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                setProject(data)
            })
    }

    useEffect(
        () => {
            render()
        }, []
    )

    const deleteCost = (event, id) => {
        event.preventDefault()
            return fetch(`https://meta-info-server.herokuapp.com/costs/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("meta_customer")}`
                }
            }) 
            
        }


    return (
        <>
            <h2>Project Details</h2>
            <Button variant="contained" sx={{background:"rgb(255, 166, 43)", marginBottom: "10px"}} onClick ={
                () => history.push(`/projects/${projectId}/costs/costCreateForm`)
            }>Add Cost</Button>
           
                  
            {console.log(project)}
            <div>Project is for: {project.customer?.name}</div>
            <div>Project Description: {project.description}</div>
            <div>Assigned to: {project.employee?.name}</div>
            <div>Has the project has been completed?: {project.is_completed===true? "Yes": "No"}</div>
            <div>Budget: ${project.budget}</div>
            <div>
                <h4>Costs</h4>
            {project.cost?.length>0 ? project.cost.map(
                (cost) => {
                    return (
                        <>
                            <ul>
                                <li>
                                    <div>Expense: {cost.label}</div>
                                    <div>Cost: ${cost.cost}</div>
                                    <Button variant="outlined" sx={{color:"black", borderColor:"rgb(255, 166, 43)"}} onClick = {
                                        () => history.push(`/projects/${projectId}/costs/${cost.id}/costEditForm`)
                                    }>Edit</Button>
                                    <Button variant="outlined" sx={{color:"black", borderColor:"rgb(255, 166, 43)", marginLeft:"20px"}} onClick = {
                                        (evt) => {deleteCost(evt, cost.id)
                                        .then(() => render())}
                                    }>Delete</Button>
                                </li>
                           </ul>
                        </>
                    )
                }):""}
                <h6>Total Cost: ${project.totalCost}</h6>
                </div>
                <div>Project Start Date: {project.start}</div>
                <div>Expected to be completed by: {project.expected_completion}</div>
            <Button variant="contained" sx={{background: "rgb(255, 166, 43)", marginTop: "10px"}} onClick = {
                () => history.push(`/projects/${project.id}/editForm`)
            }>Edit</Button>
                        
                    
               
        </>
    )
}