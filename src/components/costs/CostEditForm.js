import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"


export const CostEditForm = () => {
    const [costs, getCosts] = useState({})
    const [updateCosts, update] = useState({})
    const history = useHistory()
    const {costsId} = useParams()
    const {projectId} = useParams()

    const render = () => {
        return fetch(`http://localhost:8000/costs/${costsId}`,
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}})
            .then(res => res.json())
            .then((data) => {
                getCosts(data)
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

        const costsObject = {
            project: parseInt(costs.project.id),
            label: updateCosts.label,
            cost: parseInt(updateCosts.cost)
        }

        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("meta_customer")}`
            },
            body: JSON.stringify(costsObject)
        }
        
        return fetch(`http://localhost:8000/costs/${costsId}`, fetchOption)
            .then(() => history.push(`/projects/${projectId}/details`))
    }

    return (
        <>
            <form className="costsCreateForm">
            <div className="costsCreateForm--h2"><h1 className="costsCreateForm__title">costs Edit Form</h1></div>
                <div><img src="" /></div>
             
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Label:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder=""
                        defaultValue={costs.label}
                        onChange= {
                            (event) => {
                                const copy = {...costs}
                                copy.label = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Cost:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        placeholder=""
                        defaultValue={costs.cost}
                        onChange= {
                            (event) => {
                                const copy = {...costs}
                                copy.cost = event.target.value
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            
            <button className="btn btn-primary costsCreateForm--button" onClick={submitForm}>
                Submit Form
            </button>
        </form>
        </>
    )
}