import React from "react"
import { Link } from "react-router-dom"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory } from "react-router-dom";
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return(
        <>
            <SideNav
        onSelect={(selected) => {
            if(selected === 'home'){
                history.push("/home")
            }else if(selected === 'employees'){
                history.push('/employees')
            }else if(selected === 'customers'){
                history.push('/customers')
            }else if(selected === 'projects'){
                history.push('/projects')
            }
        }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                
                <span class="material-icons" style={{ fontSize: '1.75em' }}>home</span>
            </NavIcon>
            <NavText>
                Home
                
            </NavText>
        </NavItem>
        <NavItem eventKey="employees">
            <NavIcon>
                <span class="material-icons" style={{ fontSize: '1.75em' }}>groups</span>
            </NavIcon>
            <NavText>
                Employees
            </NavText>
        </NavItem>
        <NavItem eventKey="customers">
            <NavIcon>
                <span class="material-icons" style={{ fontSize: '1.75em' }}>person</span>
            </NavIcon>
            <NavText>
                Customers
            </NavText>
        </NavItem>
        <NavItem eventKey="projects">
            <NavIcon>
            <span class="material-icons" style={{ fontSize: '1.75em' }}>business</span>
            </NavIcon>
            <NavText>
                Projects
            </NavText>
        </NavItem>
        <NavItem eventKey="Log Out">
            <NavIcon>
            <span class="material-icons" style={{ fontSize: '1.75em' }}>logout</span>
            </NavIcon>
            <NavText onClick = {
                () => localStorage.clear()
            }>
                Log Out
            </NavText>
        </NavItem>
        <NavItem eventKey="charts">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Charts
            </NavText>
            <NavItem eventKey="charts/linechart">
                <NavText>
                    Line Chart
                </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
                <NavText>
                    Bar Chart
                </NavText>
            </NavItem>
            
        </NavItem>
    </SideNav.Nav>
</SideNav>
        </>
    )
}
