import {signOut} from "next-auth/react";
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigation = () => {
    return (
        <Navbar as="nav"
                bg="light" expand="lg"
                className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
            <Container>
                <Navbar.Brand href="">Julekalender</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-sm-inline-flex flex-sm-row-reverse">
                    <Nav as="ul" className="navbar-nav flex-grow-1">
                        <Nav.Item as="li" key="/">
                            <Nav.Link eventKey="/" className="text-light" href="/">
                                <span className="oi oi-home" aria-hidden="true"></span>
                                Hjem
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="calendar" className="text-light" href="/calendar">
                                <span className="oi oi-calendar" aria-hidden="true"></span>
                                Kalendere
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="beers" className="text-light" href="/beers">
                                <span className="oi oi-beaker" aria-hidden="true"></span>
                                Mine øl
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="logout" className="text-light" href="/user" >
                                <span className="oi oi-person" aria-hidden="true"></span>
                                Min side
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="logout" className="text-light" onClick={() => signOut()}>
                                <span className="oi oi-account-logout" aria-hidden="true"></span>
                                Logg ut
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}
export default Navigation
