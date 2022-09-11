import React from "react";
import {flexRender, Header, Table} from "@tanstack/react-table";
import Filter from "./Filter";

interface Props<T> {
    table: Table<T>
    header: Header<T, unknown>
    hasSorting: boolean
    hasFiltering: boolean
}

const TableHeaderCell = <T, >({table, header, hasSorting, hasFiltering}: Props<T>) => {
    return (
        <th key={header.id} colSpan={header.colSpan}>
            {header.isPlaceholder ? null : (
                <>
                    {hasSorting ?
                        <div
                            {...{
                                className: header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : '',
                                onClick: header.column.getToggleSortingHandler(),
                            }}
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                            {{asc: ' 🔼', desc: ' 🔽',}[header.column.getIsSorted() as string] ?? null}
                        </div>
                        : <div>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>}
                    {hasFiltering && header.column.getCanFilter() ? (
                        <div>
                            <Filter column={header.column} table={table}/>
                        </div>
                    ) : null}
                </>
            )}
        </th>
    )
}
export default TableHeaderCell
