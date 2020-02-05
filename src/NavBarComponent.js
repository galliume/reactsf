import React from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class NavBarComponent extends React.Component {
    render() {
        return (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">BookSwap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Welcome { this.props.username } </Nav.Link>
                            <Nav.Link href="/logout">logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </Container>
        );
    }
}

export default NavBarComponent;