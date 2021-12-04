import * as reactBoot from 'react-bootstrap'

function Navbar() {
    return (
        <div>
            <reactBoot.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <reactBoot.Container>
                    <reactBoot.Navbar.Brand href="#home">EXP-NODE</reactBoot.Navbar.Brand>
                    <reactBoot.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <reactBoot.Navbar.Collapse id="responsive-navbar-nav">
                        <reactBoot.Nav className="me-auto">
                            <reactBoot.Nav.Link href="#features">Features</reactBoot.Nav.Link>
                            <reactBoot.Nav.Link href="#pricing">Pricing</reactBoot.Nav.Link>
                            <reactBoot.NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <reactBoot.NavDropdown.Item href="#action/3.1">Action</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Item href="#action/3.2">Another action</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Item href="#action/3.3">Something</reactBoot.NavDropdown.Item>
                                <reactBoot.NavDropdown.Divider />
                                <reactBoot.NavDropdown.Item href="#action/3.4">Separated link</reactBoot.NavDropdown.Item>
                            </reactBoot.NavDropdown>
                        </reactBoot.Nav>
                        <reactBoot.Nav>
                            <reactBoot.Nav.Link href="#deets">More deets</reactBoot.Nav.Link>
                            <reactBoot.Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </reactBoot.Nav.Link>
                        </reactBoot.Nav>
                    </reactBoot.Navbar.Collapse>
                </reactBoot.Container>
            </reactBoot.Navbar>
        </div>
    );
}

export default Navbar;
