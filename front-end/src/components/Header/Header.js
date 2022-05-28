import React from 'react';
import {Nav,Navbar,NavDropdown,Container} from 'react-bootstrap';
import './Header.css';

const Header = () => {
return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container className="headerContainer">
            <Navbar.Brand href="/login">Acasa</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <NavDropdown title="Files" id="nav-dropdown-products">
                        <NavDropdown.Item href="/files">Vezi fisiere</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/addFile">Adauga fisiere</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/" >Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default Header;