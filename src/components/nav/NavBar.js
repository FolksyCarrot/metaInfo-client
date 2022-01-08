import React from "react"
import { Link } from "react-router-dom"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory } from "react-router-dom";
import "./NavBar.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const NavBar = () => {
    const history = useHistory()
    let width = window.innerWidth
    return(
        <>
            <SideNav className="sideBar"
        onSelect={(selected) => {
            if(selected === 'home'){
                history.push("/home")
            }else if(selected === 'employees'){
                history.push('/employees')
            }else if(selected === 'customers'){
                history.push('/customers')
            }else if(selected === 'projects'){
                history.push('/projects')
            }else if(selected === 'logOut'){
                localStorage.clear()
                history.push('/login')
            }
        }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home" >
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
        <NavItem eventKey="logOut">
            <NavIcon>
                <span class="material-icons" style={{ fontSize: '1.75em' }}>logout</span>
            </NavIcon>
            <NavText >
                Log Out
            </NavText>
        </NavItem>
        
    </SideNav.Nav>
</SideNav>



<Box sx={{ flexGrow: 1, visibility: "hidden" }} className="mobile-navbar">
      <AppBar position="static"  sx={{background: "rgb(62, 199, 185)"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
        </>
    )
}
