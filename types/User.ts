import BeerCalendar from "./BeerCalendar";
import Beer from "./Beer";

export default interface User {
    id: string,
    name: string,
    email: string,
    image: string,
    beers: Beer[]
    role: "USER"|"ADMIN"
}
