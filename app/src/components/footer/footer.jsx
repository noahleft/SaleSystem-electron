import React from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";

class Footer extends React.Component {
    render() {
        return(
            <Navbar fixed="bottom" bg="dark">
                <Container>
                    <NavbarBrand>Footer</NavbarBrand>
                </Container>
            </Navbar>
        )
    }
}

export default Footer;