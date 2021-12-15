import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const ProjectEditForm = () => {
    const [project, getProject] = useState({})
    const [updateProject, update] = useState({})
    const history = useHistory()
    const {projectId} = useParams()

    const render = () => {
        return fetch(`http://localhost:8000/projects/${projectId}`,
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}})
            .then(res => res.json())
            .then((data) => {
                getProject(data)
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

        const projectObject = {
            employee: project.employee,
            customer: project.customer,
            store: project.store,
            description: updateProject.description,
            budget: parseInt(updateProject.budget),
            start: updateProject.start,
            expected_completion: updateProject.expected_completion,
            is_completed: updateProject.is_completed
        }

        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("meta_customer")}`
            },
            body: JSON.stringify(projectObject)
        }
        
        return fetch(`http://localhost:8000/projects/${projectId}`, fetchOption)
            .then(() => history.push(`/projects/${projectId}/details`))
    }

    return (
        <>
            <form className="projectCreateForm">
            <div className="projectCreateForm--h2"><h1 className="projectCreateForm__title">Project Edit Form</h1></div>
                <div><img src="" /></div>
             
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder=""
                        defaultValue={project.description}
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.description = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Budget:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="Name"
                        defaultValue={project.budget}
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.budget = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Start:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="Name"
                        defaultValue={project.start}
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.start = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Expected Completion:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="Name"
                        defaultValue={project.expected_completion}
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.expected_completion = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">is completed?:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder="Name"
                        defaultValue={project.is_completed}
                        onChange= {
                            (event) => {
                                const copy = {...project}
                                copy.is_completed = event.target.value
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