import Beer from "./Beer";

export default interface BeerWithCalendar extends Beer {
    brewer: string
    brewerId: string
    day?: number
    calendarName?: string
    year?: number
    isPublic?: boolean
    archived?: boolean
}
