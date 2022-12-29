import Beer from "./Beer";
import Calendar from "./Calendar";
import User from "./User";

export default interface Review {
    id?: string
    ratingLabel: number
    ratingLooks: number
    ratingSmell: number
    ratingTaste: number
    ratingFeel: number
    ratingOverall: number
    comment?: string
    createdAt?: Date
    beer?: Beer
    calendar?: Calendar
    reviewer?: User
}
