import { Button } from "@mui/material"
import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"



export const Projects = () => {
    const [projects, setProjects] = useState([])
    const history = useHistory()

    const render = () => {
        return fetch("https://meta-info-server.herokuapp.com/projects",
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                setProjects(data)
            })
    }

    useEffect(
        () => {
            render()
        }, []
    )

    return (
        <>
            <h2>Projects</h2>
            <Button variant="contained" sx={{background:"rgb(255, 166, 43)", marginBottom: "15px"}} onClick ={
                () => history.push("projects/projectCreateForm")
            }>Add Project</Button>
            {projects.length > 0 ? projects.map(
                (project) => {
                    return (
                        <>
                            {console.log(project)}
                            <div>Project is for: {project.customer.name}</div>
                            <div>Project Description: {project.description}</div>
                            <div>Has the project has been completed?: {project.is_completed===true? "Yes": "No"}</div>
                            <Button variant="outlined" sx={{color:"black", borderColor:"rgb(255, 166, 43)", marginTop:"5px", marginBottom:"5px"}} onClick = {
                                () => history.push(`/projects/${project.id}/details`)
                            }>Details</Button>
                        </>
                    )
                }
                ): ""}
        </>
    )
}