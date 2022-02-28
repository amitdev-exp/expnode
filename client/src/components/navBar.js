import * as reactBoot from 'react-bootstrap'
import BillView from '../screens/billInput'
import { BrowserRouter as Router, Switch, Route,Routes, Link } from 'react-router-dom';
function Navbar() {
    return (
        <div>
            <reactBoot.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <reactBoot.Container>
                    <reactBoot.Navbar.Brand href="#home">EXP-NODE</reactBoot.Navbar.Brand>
                    <reactBoot.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <reactBoot.Navbar.Collapse id="responsive-navbar-nav">
                        <reactBoot.Nav className="me-auto">
                            <reactBoot.Nav.Link href="/billView">New Bill</reactBoot.Nav.Link>
                            <reactBoot.Nav.Link href="/billHistory">Bill history</reactBoot.Nav.Link>
                            {/* <reactBoot.NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <reactBoot.NavDropdown.Item href="#action/3.1">Action</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Item href="#action/3.2">Another action</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Item href="#action/3.3">Something</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Divider />
                                <reactBoot.NavDropdown.Item href="#action/3.4">Separated link</reactBoot.NavDropdown.Item>
                            </reactBoot.NavDropdown> */}
                        </reactBoot.Nav>
                        <reactBoot.Nav>
                            <reactBoot.Nav.Link href="#deets">Mission</reactBoot.Nav.Link>
                            <reactBoot.Nav.Link eventKey={2} href="#memes">
                                Contact US
                            </reactBoot.Nav.Link>
                        </reactBoot.Nav>
                    </reactBoot.Navbar.Collapse>
                </reactBoot.Container>
                <Router>
                    <Routes>
                        <Route path='/billView' element={<BillView/>}/>
                        <Route path='/billHistory' element={<BillView/>}/>
                    </Routes>    
                </Router>
                    
                
            </reactBoot.Navbar>
        </div>
    );
}

export default Navbar;
