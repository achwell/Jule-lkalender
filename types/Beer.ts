import BeerCalendar from "./BeerCalendar";

export default interface Beer {
    id: string
    name: string
    style: string
    description?: string
    abv?: number
    ibu?: number
    ebc?: number
    recipe?: string
    untapped?: string
    brewedDate?: Date
    bottleDate?: Date
    userId: string
    beerCalendars: BeerCalendar[]
}
