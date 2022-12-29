import {FC} from "react";
import Calendar from "../../../types/Calendar";

const CalendarName: FC<{ calendar: Calendar }> = ({calendar}) => {
    return (
        <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary">{`${calendar.name} - ${calendar.year}`}</button>
        </div>
    )
}
export default CalendarName
