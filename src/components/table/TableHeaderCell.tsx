import {flexRender, Header} from "@tanstack/react-table";

interface Props<T> {
    header: Header<T, unknown>
    hasSorting: boolean
}

const TableHeaderCell = <T, >({header, hasSorting}: Props<T>) => {
    return (
        <th key={header.id} colSpan={header.colSpan}>
            {header.isPlaceholder ? null : (
                hasSorting ?
                    <div
                        {...{
                            className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                            onClick: header.column.getToggleSortingHandler(),
                        }}
                    >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{asc: ' 🔼', desc: ' 🔽',}[header.column.getIsSorted() as string] ?? null}
                    </div>
                    : <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
            )}
        </th>
    )
}
export default TableHeaderCell
