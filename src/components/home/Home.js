import { Bar, Doughnut} from "react-chartjs-2";
import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import Chart from 'chart.js/auto';
import "./Home.css"
import { Button } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




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
    const [largestBudget, setLargestBudget] = useState()
    const [largestCost, setLargestCost] = useState()
    const [test, setTest] = useState(-1)
    //setTest state is originally (-1) so that there is no error when an account is initially created because there will be no projects available. The value of test is changed in the buttons on the charts below. The first one, sets test equal to the value of the project.id. the reset button resets test back to 0. depending on the value of test, the chart renders.
    //The state of test is set in the view charts and reset buttons onClick. The view charts, sets it to the Id of the project, where the reset sets it back to 0.


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    //this function is used to provide random color schemes for the charts. allows unlimited options in case there are many entries for cost, versus the default way that chart.Js has it setup.


    function findLargestBudget(array) {
        
        let largest = 0
        let companyName = ""
        for (let i=0; i<array.length;i++){
            if (array[i].budget>largest) {
                largest=array[i].budget;
                companyName = array[i].customer.name
            }
            
        }
        setLargestBudget({Budget: largest, CompanyName: companyName})
    }

    function findLargestCost(array) {
        
        let largestCost = 0
        let companyName = ""
        
        for (let i=0; i<array?.length;i++){
            for(let j=0; j<array[i].cost?.length; j++){
            if (array[i].cost[j].cost>largestCost) {
                //the data inputted returns an array of the project, which has an array of the costs associated. that is why a double for loop is needed.
                largestCost=array[i].cost[j].cost;
                companyName = array[i].customer.name
            }
            }
        }
        
        setLargestCost({Cost: largestCost, CostCompanyName: companyName})
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
                findLargestBudget(data)
                findLargestCost(data)

                
                
                
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

                //if statement below is to set the state of costs array to be used in the doughnut chart label section. Allows the costs to be shown if there is one or multiple.
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
        {projects.length> 0 ? <>
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
            {test>0 ? 
            <Doughnut id = "line-chart"
                data = {{
                    labels: projectCostName,
                datasets: [{
                    label: 'cost of projects',
                    data: projectCost,
                    backgroundColor: chartColor,
                    borderColor: [
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)'
                    ],
                    borderWidth: 1
                }
                ], 
                option: {
                    }
    
                }}
                
            />
            : ""}

                <div class="largest">Largest Budget: {largestBudget?.Budget} <br></br>
                    Company: {largestBudget?.CompanyName}
                </div>
                <br></br>
                <div class = "largest">Largest Cost: {largestCost?.Cost} <br></br>
                    Company: {largestCost?.CostCompanyName}
                </div>
            </div>




            <Button variant="contained" sx={{background: "rgb(255, 166, 43)"}} id="reset-button-home" size = "small" onClick = {
                () => {
                    setTest(0)
                }
            }>Reset</Button>
            
                
            <TableContainer>
            <Table class="chart-table">
                <TableHead>
                    <TableRow>
                        <TableCell align ="left" sx={{color:"rgb(255, 166, 43)"}}>Project #</TableCell>
                        <TableCell align="left" sx={{color:"rgb(255, 166, 43)"}}>Customer</TableCell>
                        <TableCell align="left" sx={{color:"rgb(255, 166, 43)"}} id="t-description">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>

            {projects.map (
                (project) => {
                    return(
                        <>
                           
                            <tr>
                                <td>{project.id}</td>
                                <td>{project.customer.name}</td>
                                <td className="table-description">{project.description}</td>
                                <td><Button variant="outlined" sx={{color:"black", marginLeft:"30px", borderColor: "rgb(255, 166, 43)"}} onClick = {
                                    () => {
                                        setTest(project.id)
                                    }
                                }>View Charts </Button></td>
                            </tr>
                            
                        
                        </>
                    )
                }
            )}
        </Table> 
        </TableContainer>
</> : <div>"You have no current projects, Feel free to go to the projects tab and add one!"</div> }
        </>
    )
}