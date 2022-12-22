import Link from "next/link";
import {useEffect, useState} from "react";
import Calendar from "../../types/Calendar";
import {getSession} from "next-auth/react";
import {calendarService} from "../services";
import {useRouter} from "next/router";
import StandardTable from "./table/StandardTable";
import {CellContext, createColumnHelper} from "@tanstack/table-core";

const Admin = () => {

    const router = useRouter()
    const [calendars, setCalendars] = useState<Calendar[]>([])

    const updateCalendars = async () => {
        const session = await getSession()
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }
        const calendars = await calendarService.getAll()
        setCalendars(calendars)
    }

    useEffect(() => {
        updateCalendars()
    }, [])

    const columnHelper = createColumnHelper<Calendar>()
    const columns = [
        columnHelper.accessor('name', {
            header: () => <span>Kalender</span>,
        }),
        columnHelper.accessor('year', {
            header: () => <span>År</span>,
        }),
        columnHelper.display({
            id: "action",
            cell: ({row: {original: {id}}}: CellContext<Calendar, any>) =>
                <Link href={{pathname: "/calendar/admin", query: {id}}} className="btn btn-sm btn-primary mr-1">Rediger</Link>
        })
    ]

    return (
        <>
            <h2>Administrator</h2>
            <p>Du er en administrator og kan redigere kalendere og hvilke øl som er med</p>
            <Link href="/calendar/edit" className="btn btn-sm btn-success mb-2">Lag ny kalender</Link>
            <Link href="/admin/beers" className="btn btn-sm btn-success mb-2">Se alle registrerte øl</Link>
            <StandardTable data={calendars} columns={columns}/>
        </>
    )
}
export default Admin
