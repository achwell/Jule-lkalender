import {FC, useEffect, useState} from "react";
import BeerTable, {BeerDetails} from "./BeerTable";
import {alertService, beerService, calendarService, reviewService} from "../services";
import User from "../../types/User";

const CalendarOverview: FC<{calendarId: string, user: User}> = ({calendarId, user}) => {

    const [beers, setBeers] = useState<Partial<BeerDetails>[]>([])

    const getBeers = async (id: string) => {
        try {
            const userId = user.id
            const calendarWithBeers = await calendarService.getAllWithBeer(id)
            const reviews = (await reviewService.getByCalendar(id)).filter(value => !!value.reviewer && value.reviewer.id === userId)
            const beerIds = calendarWithBeers.map(c => c.beerId)
            const allBeers = await beerService.getAll();
            const calendarBeers = allBeers
                .filter(beer => beerIds.includes(beer.id))
                .map(beer => {
                    const day = (calendarWithBeers.filter(c => c.beerId === beer.id)[0]).day
                    const r = reviews.filter(value => value.beer.id === beer.id)
                    const review = !!r && r.length > 0 ? r[0] : undefined
                    return {beer, day, review, calendarId: id};
                })
                .sort((a, b) => (a.day > b.day) ? 1 : ((b.day > a.day) ? -1 : 0))
            setBeers(calendarBeers)
        } catch (e) {
            alertService.error("getBeers: " + e)
        }
    }

    useEffect(() => {
        if (!!calendarId) {
            getBeers(calendarId);
        }
    }, [calendarId])

    return (
        <>
            <h1>Kalender</h1>
            <p>Velkommen til Kalender A : 2022</p>
            <p>Her kan du se alle øl og stemme på dem du har drukket!</p>
            <BeerTable beers={beers}/>
        </>
    )
}
export default CalendarOverview
