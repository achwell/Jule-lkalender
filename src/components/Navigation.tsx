import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getSession, signOut} from "next-auth/react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import User from "../../types/User";
import {userService} from "../services";

const Navigation = () => {
    const router = useRouter()
    const [user, setUser] = useState<User>()

    const updateUser = async () => {
        const session = await getSession()
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }
        const {user: {email}} = session;
        const user = await userService.getByEmail(email)
        setUser(user)
    }

    useEffect(() => {
        updateUser()
    }, [])

    if(!user) {
        return null
    }

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
                        {user.role === "ADMIN" && <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/users">Brukere</NavDropdown.Item>
                            <NavDropdown.Item href="/reviews">Tibakemeldinger</NavDropdown.Item>
                        </NavDropdown>}
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
