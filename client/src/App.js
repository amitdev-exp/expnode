
import './App.css';
import Home from '../src/screens/home'
import BillView from '../src/screens/billInput'
import * as reactBoot from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route,Routes, Link } from 'react-router-dom';
function App() {
  return (
    <div>
      <reactBoot.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <reactBoot.Container>
                    <reactBoot.Navbar.Brand href="/">MAHALAXMI JEWELLERS</reactBoot.Navbar.Brand>
                    <reactBoot.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <reactBoot.Navbar.Collapse id="responsive-navbar-nav">
                        <reactBoot.Nav className="me-auto">
                            <reactBoot.Nav.Link href="/billView">New Bill</reactBoot.Nav.Link>
                            <reactBoot.Nav.Link href="#pricing">New Solution</reactBoot.Nav.Link>
                            <reactBoot.NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <reactBoot.NavDropdown.Item href="#action/3.1">Action</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Item href="#action/3.2">Another action</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Item href="#action/3.3">Something</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Divider />
                                <reactBoot.NavDropdown.Item href="#action/3.4">Separated link</reactBoot.NavDropdown.Item>
                            </reactBoot.NavDropdown>
                        </reactBoot.Nav>
                        <reactBoot.Nav>
                            <reactBoot.Nav.Link href="#deets">Mission</reactBoot.Nav.Link>
                            <reactBoot.Nav.Link eventKey={2} href="#memes">
                                Contact US
                            </reactBoot.Nav.Link>
                        </reactBoot.Nav>
                    </reactBoot.Navbar.Collapse>
                </reactBoot.Container>
                
                    
                
            </reactBoot.Navbar>
            <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/billView' element={<BillView/>}/>
                    </Routes>    

                    
                    
            </Router>
      
    </div>
  );
}

export default App;
