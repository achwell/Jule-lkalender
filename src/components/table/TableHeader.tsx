import {HeaderGroup} from "@tanstack/react-table"
import TableHeaderCell from "./TableHeaderCell"

interface Props<T> {
    headerGroups: HeaderGroup<T>[]
    hasSorting: boolean
}

const TableHeader = <T, >({headerGroups, hasSorting}: Props<T>) => {

    if (!headerGroups) {
        return null
    }
    return (
        <thead>
        <tr>
            {headerGroups
                .map(headerGroup =>
                    headerGroup.headers.map(header => <TableHeaderCell key={header.id} header={header}
                                                                       hasSorting={hasSorting}/>))}
        </tr>
        </thead>

    )
}
export default TableHeader
