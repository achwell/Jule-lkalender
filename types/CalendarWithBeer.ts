import Calendar from "./Calendar";

export default interface CalendarWithBeer extends Calendar {
    beerId: string
    beer: string
    day: number
}
