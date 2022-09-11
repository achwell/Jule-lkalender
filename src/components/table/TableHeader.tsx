import React from "react"
import {Table} from "@tanstack/react-table"
import TableHeaderCell from "./TableHeaderCell"

interface Props<T> {
    table: Table<T>
    hasSorting: boolean
    hasFiltering: boolean
}

const TableHeader = <T, >({table, hasSorting, hasFiltering}: Props<T>) => {

    const headerGroups = table.getHeaderGroups()

    if (!headerGroups) {
        return null
    }

    const harGroups = !!headerGroups.length

    return (
        <thead>
        {
            harGroups
                ? headerGroups.map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header =>
                            <TableHeaderCell key={header.id} table={table} header={header} hasSorting={hasSorting}
                                             hasFiltering={hasFiltering}/>)}
                    </tr>
                ))
                : headerGroups
                    .map(headerGroup =>
                        headerGroup.headers.map(header => <TableHeaderCell key={header.id} table={table} header={header}
                                                                           hasSorting={hasSorting}
                                                                           hasFiltering={hasFiltering}/>))
        }
        </thead>

    )
}
export default TableHeader
