import {signOut} from "next-auth/react";
import Link from "next/link";
import {Button} from "react-bootstrap";

const Navigation = () => {
    return (
        <nav
            className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
            <div className="container">
                <a className="navbar-brand" href="">Julekalender</a>
                <Button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </Button>

                <div className="navbar-collapse d-sm-inline-flex flex-sm-row-reverse collapse">
                    <ul className="navbar-nav flex-grow-1">
                        <Link href="/">
                            <a className="nav-link text-light">
                                <span className="oi home" aria-hidden="true"></span> Hjem
                            </a>
                        </Link>
                        <li className="nav-item">
                            <Link href="/calendar">
                                <a className="nav-link text-light">
                                    <span className="oi oi-calendar" aria-hidden="true"></span> Kalendere
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/beers/">
                                <a className="nav-link text-light">
                                    <span className="oi oi-beaker" aria-hidden="true"></span> Mine øl
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-light" onClick={() => signOut()}>
                                <span className="oi oi-account-logout" aria-hidden="true"></span> Logg ut
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}
export default Navigation
