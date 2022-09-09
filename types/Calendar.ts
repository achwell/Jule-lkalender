import BeerCalendar from "./BeerCalendar";

export default interface Calendar {
    id: string
    name: string
    year: number
    isPublic: boolean
    archived: boolean
    beerCalendars: BeerCalendar[]
}
