import {NextPage} from "next";
import {getSession} from "next-auth/react";
import {Spinner} from "react-bootstrap";
import {Layout} from "../../src/components/Layout";
import Admin from "../../src/components/Admin";
import User from "../../types/User";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {beerService, userService} from "../../src/services";
import StandardTable from "../../src/components/table/StandardTable";
import {createColumnHelper} from "@tanstack/table-core";
import BeerWithCalendar from "../../types/BeerWithCalendar";
import {fuzzySort} from "../../src/components/table/utils";

const Calendars: NextPage = () => {

    const router = useRouter()
    const [user, setUser] = useState<User>()
    const [myBeers, setMyBeers] = useState<BeerWithCalendar[]>([])

    const updateData = async () => {
        const session = await getSession()
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }
        const {user: {email}} = session;
        const user = await userService.getByEmail(email)
        const beers = await beerService.getUserBeers(user.id)
        setMyBeers(beers)
        setUser(user)
    }

    useEffect(() => {
        updateData()
    }, [])

    const columnHelper = createColumnHelper<BeerWithCalendar>()
    const columns = [
        columnHelper.accessor('calendarName', {
            header: () => <span>Kalender</span>,
            filterFn: 'fuzzy',
            sortingFn: fuzzySort,
        }),
        columnHelper.accessor('name', {
            header: () => <span>Øl</span>,
            filterFn: 'fuzzy',
            sortingFn: fuzzySort,
        }),
        columnHelper.accessor('day', {
            header: () => <span>Dag i kalender</span>,
            cell: (c) => c.getValue() ? c.getValue() : "",
        })
    ]

    const viewCalendar = (value: BeerWithCalendar) => {
        router.push(`/calendar/${value.calendarId}`)
    }

    if (!user) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 mt-5">
                <h1>Kalendere</h1>
                {user.role === "ADMIN" && <Admin/>}

                <h2>Mine kalendere</h2>
                <p>Her ser du en oversikt over dine kalendere og øl.</p>
                <StandardTable columns={columns} data={myBeers} hasFiltering={true} rowCallback={viewCalendar} />
            </div>
        </Layout>
    )
}
export default Calendars
