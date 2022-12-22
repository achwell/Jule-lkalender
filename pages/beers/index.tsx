import {useEffect, useState} from "react";
import {NextPage} from "next";
import Link from "next/link";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {createColumnHelper} from "@tanstack/table-core";
import {Spinner} from "react-bootstrap";
import {Layout} from "../../src/components/Layout";
import Beer from "../../types/Beer";
import {beerService, userService} from "../../src/services";
import StandardTable from "../../src/components/table/StandardTable";

const Beers: NextPage = () => {

    const router = useRouter()
    const [beers, setBeers] = useState<Beer[]>([])

    const updateBeers = async () => {
        const session = await getSession()
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }
        const {user: {email}} = session;
        const user = await userService.getByEmail(email)

        const userId = user!.id;
        const beers = await beerService.getByUserId(userId)
        setBeers(beers ? beers : [])
    }

    useEffect(() => {
        updateBeers()
    }, [])


    const columnHelper = createColumnHelper<Beer>()
    const columns = [
        columnHelper.accessor('name', {
            header: () => <span>Navn</span>,
        }),
        columnHelper.accessor('style', {
            header: () => <span>Stil</span>,
        }),
        columnHelper.display({
            id: "details",
            header: () => "",
            cell: ({row: {original: {id}}}) => {
                return (
                    <Link href={{pathname: "/beers/details/", query: {id}}} className="btn btn-sm btn-primary mr-1">
                        Detaljer
                    </Link>)
            }
        }),
        columnHelper.display({
            id: "reviews",
            header: () => "",
            cell: ({row: {original: {id}}}) => {
                return <a href={`/beers/reviews/${id}`}
                          className="btn btn-sm btn-success mr-1">Tilbakemeldinger</a>
            }
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
                <h1>Mine øl</h1>
                <Link href="/beers/edit" className="btn btn-sm btn-success mb-2">Legg til øl</Link>
                <StandardTable data={beers} columns={columns}/>
            </div>
        </Layout>
    )
}

export default Beers
