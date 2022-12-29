import React from "react";
import {flexRender, Row} from "@tanstack/react-table";

interface Props<T> {
    rows: Row<T>[]
    rowCallback?: (value: T) => void
}

const TableBody = <T, > ({rows, rowCallback}: Props<T>) => {
    return (
        <tbody>
        {rows.map(row => (
            <tr key={row.id} onClick={!!rowCallback ? (() => rowCallback(row.original)) : () => {}}>
                {row.getVisibleCells().map(cell => <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>)}
            </tr>
        ))}
        </tbody>

    )
}
export default TableBody
