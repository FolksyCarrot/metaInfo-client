import { Bar, Doughnut} from "react-chartjs-2";
import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import Chart from 'chart.js/auto';
import "./Home.css"






export const Home = () => {
    
    const[projects, setProjects] = useState([])
    const[projectId, setProjectId] = useState([])
    const [projectName, setProjectName] = useState([])
    const [budgets, setBudgets] = useState([])
    const [totalCost, setTotalCost] = useState([])
    const[revenue, setRevenue] = useState([])
    const[projectCostName, setProjectCostName] = useState([])
    const [projectCost, setProjectCost] = useState([])
    const[chartColor, setChartColor] = useState([])
    const [test, setTest] = useState(-1)
    //setTest state is originally (-1) so that there is no error when an account is initially created because there will be no projects available. The value of test is changed in the buttons on the charts below. The first one, sets test equal to the value of the project.id. the reset button resets test back to 0. depending on the value of test, the chart renders.

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    function findLargestBudget(array) {
        let largest = 0
        for (let i=0; i<=largest;i++){
            if (array[i]>largest) {
                //var largest=array[i];
                largest=array[i];
            }
            
        }
        return largest
    }

    const render = () => {
        return fetch("https://meta-info-server.herokuapp.com/projects",
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                //initially, we set the projects, then we create a state for each instance of the property we wish to use. Doing this because ternary statements of .map did not yield results.

                setProjects(data)
                let test = data.map( (project) => project.budget)
                setBudgets(test)
                let cost = data.map( (costs) => costs.totalCost)
                setTotalCost(cost)
                let profit = data.map( (money) => (money.budget - money.totalCost))
                setRevenue(profit)
                let id = data.map( (project) => project.id )
                setProjectId(id)

                console.log(budgets)
                console.log({"Largest Budget":findLargestBudget(budgets)})
                
            })
    }
    const singleRender = (id) => {
        return fetch(`https://meta-info-server.herokuapp.com/projects/${id}`,
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                //Same as above, but now we are re-setting the same variables to house the information of the selected projected.
                

                setBudgets([data.budget])
                setTotalCost([data.totalCost])
                setRevenue([data.budget-data.totalCost])
                setProjectId([data.id])
                if (data.cost.length> 1) {
                   let arr =  data?.cost?.map( (data) => data.label)
                   setProjectCostName(arr)
                } else if (data.cost.length === 1) {
                    setProjectCostName([data.cost[0].label])
                }
                setProjectCost(data.cost.map( (data) => data.cost))
                let colors = []
                for(let i = 0; i<data.cost.length; i ++){
                    colors.push(`rgb(${getRandomInt(250)}, ${getRandomInt(250)}, ${getRandomInt(250)})`)
                }
                setChartColor(colors)
                console.log(data)
            })
    }

    //this is the initial render
    useEffect(
        () => {
            render()
        }, []
    )

    //second render depending on what project.id is selected, that value is then passed in the singleRender argument above. Watches for state change of test, to force a re-render.
    useEffect(
        () => {
            if(test>0){
                singleRender(test) 
                .then(console.log(projectCostName))
                
            }else if(test === 0){
                render()
            }
            
        }, [test]
    )
    
    
    return(
        <>
            <div class ="chart-div">

            <Bar id = "line-chart"
                data = {{
                    labels: projectId,
                datasets: [{
                    label: 'cost of projects',
                    data: totalCost,
                    backgroundColor: [
                        'rgba(217, 30, 24, 0.2)',
                        'rgba(217, 30, 24, 0.2)',
                        'rgba(217, 30, 24, 0.2)',
                        'rgba(217, 30, 24, 0.2)',
                        'rgba(217, 30, 24, 0.2)',
                        'rgba(217, 30, 24, 0.2)'
                    ],
                    borderColor: [
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'budget of projects',
                    data: budgets,
                    backgroundColor: [
                        'rgba(45, 85, 255, 0.2)',
                        'rgba(45, 85, 255, 0.2)',
                        'rgba(45, 85, 255, 0.2)',
                        'rgba(45, 85, 255, 0.2)',
                        'rgba(45, 85, 255, 0.2)',
                        'rgba(45, 85, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(45, 85, 255, 1)',
                        'rgba(45, 85, 255, 1)',
                        'rgba(45, 85, 255, 1)',
                        'rgba(45, 85, 255, 1)',
                        'rgba(45, 85, 255, 1)',
                        'rgba(45, 85, 255, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Total Revenue',
                    data: revenue,
                    backgroundColor: [
                        'rgba(147, 250, 165, 0.2)',
                        'rgba(147, 250, 165, 0.2)',
                        'rgba(147, 250, 165, 0.2)',
                        'rgba(147, 250, 165, 0.2)',
                        'rgba(147, 250, 165, 0.2)',
                        'rgba(147, 250, 165, 0.2)'
                    ],
                    borderColor: [
                        'rgba(147, 250, 165, 1)',
                        'rgba(147, 250, 165, 1)',
                        'rgba(147, 250, 165, 1)',
                        'rgba(147, 250, 165, 1)',
                        'rgba(147, 250, 165, 1)',
                        'rgba(147, 250, 165, 1)'
                    ],
                    borderWidth: 1
                }
                ], 
                option: {
                    }
    
                }}
                
            />

            <Doughnut id = "line-chart"
                data = {{
                    labels: projectCostName,
                datasets: [{
                    label: 'cost of projects',
                    data: projectCost,
                    backgroundColor: chartColor,
                    borderColor: [
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)',
                        'rgba(217, 30, 24, 1)'
                    ],
                    borderWidth: 1
                }
                ], 
                option: {
                    }
    
                }}
                
            />


            </div>





            <button class="reset-button" onClick = {
                () => {
                    setTest(0)
                }
            }>Reset</button>
                

            <table class="chart-table">
                <tr>
                    <th>Project #</th>
                    <th>Customer</th>
                    <th>Description</th>
                    
                </tr>

            {projects.map (
                (project) => {
                    return(
                        <>
                           
                            <tr>
                                <td>{project.id}</td>
                                <td>{project.customer.name}</td>
                                <td>{project.description}</td>
                                <td><button onClick = {
                                    () => {
                                        setTest(project.id)
                                    }
                                }>View Charts</button></td>
                            </tr>
                            
                        
                        </>
                    )
                }
            )}
        </table> 
        </>
    )
}