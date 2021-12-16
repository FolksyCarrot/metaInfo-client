import React, {useState} from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"


export const CostCreateForm = () => {
    const [costs, setCosts] = useState({})
    const history = useHistory()
    const {projectId} = useParams()

    const submitForm = (event) => {
        event.preventDefault()
  
          const costsObject = {
              project_id: parseInt(projectId),
              label: costs.label,
              cost: parseInt(costs.cost)
          }
  
  
          const fetchOption = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "authorization": `Token ${localStorage.getItem("meta_customer")}`
              },
              body: JSON.stringify(costsObject)
          }
          
          return fetch("https://meta-info-server.herokuapp.com/costs", fetchOption)
              .then(() => history.push(`/projects/${projectId}/details`))
      }

    return (
        <>
            <form className="costsCreateForm">
            <div className="costsCreateForm--h2"><h1 className="costsCreateForm__title">New costs Form</h1></div>
                <div><img src="" /></div>
             
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Label:</label>
                    <input
                        required= {true} autoFocus={true}
                        type="text"
                        className="form-control-stock"
                        onChange= {
                            (event) => {
                                const copy = {...costs}
                                copy.label = event.target.value
                                setCosts(copy)
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
                        onChange= {
                            (event) => {
                                const copy = {...costs}
                                copy.cost = event.target.value
                                setCosts(copy)
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