import {flexRender, Row} from "@tanstack/react-table";

interface Props<T> {
    rows: Row<T>[]
}

const TableBody = <T, > ({rows}: Props<T>) => {
    return (
        <tbody>
        {rows.map(row => (
            <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
            </tr>
        ))}
        </tbody>

    )
}
export default TableBody
