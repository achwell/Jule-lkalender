import type {NextPage} from 'next'
import {getSession} from 'next-auth/react';
import {Spinner} from "react-bootstrap";
import {Layout} from "../src/components/Layout";
import User from "../types/User";
import {useEffect, useState} from "react";
import {userService} from "../src/services";
import {useRouter} from "next/router";

const Home: NextPage = () => {

    const router = useRouter()
    const [user, setUser] = useState<User>()

    const updateUser = async () => {
        const session = await getSession()
        const sessionUser = await userService.getByEmail(session!.user!.email!)
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

    if (!user) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <Layout>
            <div className="p-4">
                <div className="container"><h1>Hei {user.name}!</h1>
                    <p>Velkommen til Juleølkalenderen!</p>
                    <p>
                        Det første du må gjøre er å registrere din øl. Det gjør du <a
                        href="/beers/">her</a>.
                        Deretter vil en administrator begynne arbeidet med å legge din øl til i en kalender. Du
                        kan se på <a href="/calendar">kalenderoversikten</a> for å se hvor din øl er
                        plassert.
                    </p>
                    <p>
                        Når alle øl er registrert og plassert er vi klare for årets beste måned! Stemmeavgivning
                        er åpent alltid, slik at du kan tjuvstarte, eller drikke
                        i eget tempo. Men vi avventer resultater til vi er forbi 24. desember!
                    </p></div>
            </div>
        </Layout>
    )
}
export default Home
