import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"



export const ProjectDetails = () => {
    const [project, setProject] = useState([])
    const history = useHistory()
    const {projectId} = useParams()

    const render = () => {
        return fetch(`http://localhost:8000/projects/${projectId}`,
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

    return (
        <>
            <h2>Project Details</h2>
            <button onClick ={
                () => history.push("projects/projectCreateForm")
            }>Add Cost</button>
           
                  
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
                                    <button onClick = {
                                        () => history.push(`projects/${projectId}/costs/${cost.id}/editForm`)
                                    }>Edit</button>
                                </li>
                           </ul>
                        </>
                    )
                }):""}
                <h6>Total Cost: ${project.totalCost}</h6>
                </div>
                <div>Project Start Date: {project.start}</div>
                <div>Expected to be completed by: {project.expected_completion}</div>
            <button onClick = {
                () => history.push(`/projects/${project.id}/editForm`)
            }>Edit</button>
                        
                    
               
        </>
    )
}