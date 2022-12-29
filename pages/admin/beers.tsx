import {useEffect, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {createColumnHelper} from "@tanstack/table-core";
import {Spinner} from "react-bootstrap";
import {Layout} from "../../src/components/Layout";
import {beerService} from "../../src/services";
import BeerWithCalendar from "../../types/BeerWithCalendar";
import StandardTable from "../../src/components/table/StandardTable";

const Beers: NextPage = () => {

    const router = useRouter()
    const [beers, setBeers] = useState<BeerWithCalendar[]>([])

    const updateBeers = async () => {
        const session = await getSession()
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }
        const beers = await beerService.getAllWithCalendar()
        setBeers(beers ? beers : [])
    }

    useEffect(() => {
        updateBeers()
    }, [])

    const columnHelper = createColumnHelper<BeerWithCalendar>()
    const columns = [
        columnHelper.accessor('name', {
            header: () => <span>Ølnavn</span>,
        }),
        columnHelper.accessor('brewer', {
            header: () => <span>Brygger</span>,
        }),
        columnHelper.accessor('style', {
            header: () => <span>Stil</span>,
        }),
        columnHelper.accessor('abv', {
            header: () => <span>Abv</span>,
        }),
        columnHelper.accessor('year', {
            header: () => <span>År</span>,
            cell: (c) => c.getValue() ? c.getValue() : ""
        }),
        columnHelper.accessor('calendarName', {
            header: () => <span>Kalender</span>,
        }),
        columnHelper.accessor('day', {
            header: () => <span>Dag i kalender</span>,
            cell: (c) => c.getValue() ? c.getValue() : ""
        }),
    ]

    if (!beers) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 mt-5">
                <h1>Alle øl</h1>
                <StandardTable data={beers} columns={columns}/>
            </div>
        </Layout>
    )
}

export default Beers
