import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import Calendar from "../../types/Calendar"
import {getSession} from "next-auth/react";
import {alertService, beerService, calendarService, userService} from "../../src/services";
import Link from "next/link";
import StandardTable from "../../src/components/table/StandardTable";
import {CellContext, createColumnHelper} from "@tanstack/table-core";
import CalendarWithBeer from "../../types/CalendarWithBeer";
import {Layout} from "../../src/components/Layout";
import Beer from "../../types/Beer";
import RemoveBeerModal from "./RemoveBeerModal";
import AddBeerModal from "./AddBeerModal";
import BeerCalendar from "../../types/BeerCalendar";

const Admin = () => {
    const router = useRouter()
    const {query: {id}} = router

    const [calendarWithBeers, setCalendarWithBeers] = useState<CalendarWithBeer[]>([])
    const [availableBeers, setAvailableBeers] = useState<{ key: string, value: string }[]>([])
    const [beer, setBeer] = useState<Beer>()
    const [calendar, setCalendar] = useState<Calendar>()
    const [error, setError] = useState<number>()
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    async function updateCalendar(id: string) {
        setBeer(undefined)
        const session = await getSession()
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }

        const calendar = await calendarService.getById(id)

        if (!calendar) {
            setError(404)
            return
        }
        const sessionUser = await userService.getByEmail(session!.user!.email!)
        if (sessionUser.role === "ADMIN") {
            setCalendar(calendar);
            const calendarWithBeers = await calendarService.getAllWithBeer()
            const availableBeers = await beerService.getAvalilableBeers()
            setCalendarWithBeers(calendarWithBeers)
            setAvailableBeers(availableBeers)
            setError(undefined)
        } else {
            setError(403)
        }
    }

    useEffect(() => {
        if (id) {
            updateCalendar(id as string)
        } else {
            setCalendar(undefined)
        }
    }, [id]);

    const fjernOel = (beerId: string, beer: string) => {
        setBeer({id: beerId, name: beer, style: "", beerCalendars: [], userId: ""})
        setShowDeleteDialog(true)
    }

    const columnHelper = createColumnHelper<CalendarWithBeer>()
    const columns = [
        columnHelper.accessor('beer', {
            header: () => <span>Ølnavn</span>,
        }),
        columnHelper.accessor('day', {
            header: () => <span>Dag</span>,
        }),
        columnHelper.display({
            id: "action",
            header: () => <span></span>,
            cell: ({row: {original: {beerId, beer}}}: CellContext<CalendarWithBeer, any>) =>
                <>
                    <Link href={{pathname: "/beers/details/", query: {id: beerId}}}>
                        <a className="btn btn-sm btn-primary mr-1">Detaljer</a>
                    </Link>
                    <a className="btn btn-sm btn-danger btn-delete-user"
                       onClick={() => fjernOel(beerId, beer)}>Fjern!</a>
                </>
        })
    ]

    if (error) {
        return <div>{error}</div>
    }

    const deleteBeer = () => {
        if (calendar && beer) {
            calendarService.removeBeer(calendar.id, beer.id).then(value => {
                alertService.info(`${beer.name} fjernet fra kalender ${calendar.year}: ${calendar.name}`)
                updateCalendar(id as string)
                setShowDeleteDialog(false)
            })
        }
    }

    function addBeer(beerCalendar: BeerCalendar) {
        calendarService.addBeer(beerCalendar)
            .then(result => {
            alertService.info(`Øl lagt til kalender ${calendar?.year}: ${calendar?.name} den ${result.day}.`)
            updateCalendar(id as string)
            setShowAddDialog(false)
        })
            .catch(e => {
                alertService.error("Kunne ikke legge til øl")
                updateCalendar(id as string)
                setShowAddDialog(false)
            })
    }

    return (
        <Layout>
            <RemoveBeerModal beerName={beer?.name} calendarName={calendar?.name} calendarYear={calendar?.year}
                             show={showDeleteDialog} hide={() => setShowDeleteDialog(false)} callback={deleteBeer}/>
            <AddBeerModal
                beers={availableBeers}
                calendarId={id as string}
                show={showAddDialog}
                hide={() => setShowAddDialog(false)}
                callback={addBeer}/>
            <div className="app-container bg-light">
                <div className="col-md-6 offset-md-3 mt-5"><h1>Administrere {calendar?.year} : {calendar?.name}</h1>
                    <p>Oversikt over bidrag i kalender {calendar?.name} samt muligheten til å legge til øl</p>
                    <ul>
                        <li>Er offentlig: {calendar?.isPublic ? "Ja" : "Nei"}</li>

                        <li>Er arkivert: {calendar?.archived ? "Ja" : "Nei"}</li>
                    </ul>

                    <a className="btn btn-sm btn-success mb-2" onClick={() => setShowAddDialog(true)}>Legg til øl</a>
                    <Link href={{pathname: "/calendar/edit/", query: {id}}}>
                        <a className="btn btn-sm btn-success mb-2">Rediger kalender</a>
                    </Link>

                    <StandardTable columns={columns} data={calendarWithBeers}/>
                </div>
            </div>
        </Layout>
    )

}
export default Admin
