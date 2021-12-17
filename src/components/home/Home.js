import { Line} from "react-chartjs-2";
import React, { useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import Chart from 'chart.js/auto';
import "./Home.css"






export const Home = () => {
    const[projects, setProjects] = useState([])
    const [projectName, setProjectName] = useState([])
    const [budgets, setBudgets] = useState([])
    const [totalCost, setTotalCost] = useState([])
    const[revenue, setRevenue] = useState([])
    const [test, setTest] = useState(-1)
    const render = () => {
        return fetch("https://meta-info-server.herokuapp.com/projects",
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                setProjects(data)
                let test = data.map( (project) => project.budget)
                setBudgets(test)
                let cost = data.map( (costs) => costs.totalCost)
                setTotalCost(cost)
                let profit = data.map( (money) => (money.budget - money.totalCost))
                setRevenue(profit)
                console.log(profit)
                
            })
    }
    const singleRender = (id) => {
        return fetch(`https://meta-info-server.herokuapp.com/projects/${id}`,
        {headers: { "Authorization": `Token ${localStorage.getItem("meta_customer")}`}

        })
            .then(res => res.json())
            .then((data) => {
                
               setBudgets([data.budget])
               setTotalCost([data.totalCost])
               setRevenue([data.budget-data.totalCost])
                
            })
    }

    useEffect(
        () => {
            render()
        }, []
    )

    useEffect(
        () => {
            if(test>0){
                singleRender(test) 
            }else if(test === 0){
                render()
            }
            
        }, [test]
    )
    

    return(
        <>
            <Line id = "line-chart"
                data = {{
                    labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
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
                options: {
                    }
    
                }}
                
            />





            <button onClick = {
                () => {
                    setTest(0)
                }
            }>Reset</button>
                

            <table>
                <tr>
                    <th>Project #</th>
                    <th>Customer</th>
                    <th>Passing TDs</th>
                    <th>Completion %</th>
                    <th>Y/A</th>
                    <th>INTs</th>
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