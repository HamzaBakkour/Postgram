//src/components/Navbar.jsx
import React from "react";
import { Navbar, Container, Image, NavDropdown, Nav }
    from "react-bootstrap";
import { useNavigate } from "react-router";
import { getUser } from "../hooks/user.actions";
import { Link } from "react-router-dom";

function Navigationbar() {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login/");
    };

    const user = getUser();

    return (
        <Navbar bg = "primary" variant = "dark">
            <Container>
                
                <Navbar.Brand className = "fw-blod" as={Link} to={`/`}>
                    Postgram
                </Navbar.Brand>

                <Navbar.Collapse className = "justify-content-end">
                    <Nav>
                        <NavDropdown
                        title = {
                            <Image
                            src = { user.avatar }
                            roundedCircle
                            width = {36}
                            height = {36}
                            />
                        }>
                            <NavDropdown.Item
                            as = {Link}
                            to = {`/profile/${user.id}/`}>
                                Profile
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick = { handleLogout }>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;

