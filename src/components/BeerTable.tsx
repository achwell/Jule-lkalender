import {FC} from "react";
import Link from "next/link";
import {Row} from "@tanstack/react-table";
import {createColumnHelper} from "@tanstack/table-core";
import Beer from "../../../../types/Beer";
import Review from "../../../../types/Review";
import StandardTable from "../../../../src/components/table/StandardTable";

export interface BeerDetails {
    calendarId: number
    day: number
    beer: Beer
    review?: Review
}

const getBeerName = (row: Row<BeerDetails>) => {
    const beerId = row.original.beer.id
    return <Link href={`/calendar/beer/${beerId}`} className="btn btn-sm btn-primary mr-1">{row.original.beer.name}</Link>
}

const getAction = (row: Row<BeerDetails>) => {
    const beerId = row.original.beer.id
    const calendarId = row.original.calendarId

    const [className, label] = row.original.review ?
        ["btn btn-sm btn-warning mr-1", "Endre stemme"] :
        ["btn btn-sm btn-primary mr-1", "Gi stemme", ""]
    return <Link href={`/calendar/${calendarId}/${beerId}/review`} className={className}>{label}</Link>
}
const BeerTable: FC<{ beers: BeerDetails[] }> = ({beers}) => {
    const columnHelper = createColumnHelper<BeerDetails>()
    const columns = [
        columnHelper.accessor(row => row.day, {id: "day", header: () => <span>Dag</span>}),
        columnHelper.display({id: "name", header: () => <span>Navn</span>, cell: props => getBeerName(props.row)}),
        columnHelper.accessor(row => row.review?.ratingTaste, {id: "ratingTaste", header: () => <span>S</span>}),
        columnHelper.accessor(row => row.review?.ratingSmell, {id: "ratingSmell", header: () => <span>L</span>}),
        columnHelper.accessor(row => row.review?.ratingFeel, {id: "ratingFeel", header: () => <span>F</span>}),
        columnHelper.accessor(row => row.review?.ratingLooks, {id: "ratingLooks", header: () => <span>U</span>}),
        columnHelper.accessor(row => row.review?.ratingLabel, {id: "ratingLabel", header: () => <span>S</span>}),
        columnHelper.accessor(row => row.review?.ratingOverall, {id: "ratingOverall", header: () => <span>O</span>}),
        columnHelper.display({id: "giStemme", header: "", cell: props => getAction(props.row)})
    ]

    return <StandardTable columns={columns} data={beers}/>

}
export default BeerTable
