import React,{useState} from "react"
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
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export const NavBar = () => {
    const history = useHistory()
    const [state, setState] = useState({
        top: false,
      });

    const toggleDrawer = (anchor, open) => (event) => {
    if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
    ) {
        return;
    }

    setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 , background: "rgb(255, 166, 43)", color:"white"}}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {['home', 'employees', 'customers', 'projects', 'logout'].map((text, index) => (
              <ListItem button key={text} onClick={() => handleNavbarClick(text)}>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      );

    const handleNavbarClick = (selected) => {
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
    }

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



<Box sx={{ flexGrow: 1 }} id="mobile-navbar">

      <AppBar position="static"  sx={{background: "rgb(255, 166, 43)"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick = {toggleDrawer("top", true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="top"
            open={state["top"]}
            onClose={toggleDrawer("top", false)}
          >
              {list("top")}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
        </>
    )
}
