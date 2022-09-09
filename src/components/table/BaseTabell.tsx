import {
    ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import {ColumnDef, getCoreRowModel, TableOptions} from "@tanstack/table-core"
import BTable from "react-bootstrap/Table"
import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import {useState} from "react"
import {fuzzyFilter} from "./utils";
import DebouncedInput from "../DebouncedInput";

interface Props<T> {
    columns: ColumnDef<T, any>[]
    data: T[]
    hasSorting?: boolean
    hasFiltering?: boolean
}

const BaseTabell = <T, >({columns, data, hasSorting = true, hasFiltering = false}: Props<T>) => {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    let options: TableOptions<T> = {
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        filterFns: {fuzzy: fuzzyFilter},
        state: {},
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    }

    if (hasSorting) {
        options = {
            ...options,
            getSortedRowModel: getSortedRowModel(),
            state: {
                ...options.state,
                sorting,
            }
        }
    }

    if (hasFiltering) {
        options = {
            ...options,
            onColumnFiltersChange: setColumnFilters,
            onGlobalFilterChange: setGlobalFilter,
            getFilteredRowModel: getFilteredRowModel(),
            getSortedRowModel: getSortedRowModel(),
            globalFilterFn: fuzzyFilter,
            state: {
                ...options.state,
                columnFilters,
                globalFilter
            }
        }
    }
    const table = useReactTable<T>(options)

    return (
        <>
            {hasFiltering && <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className="p-2 font-lg shadow border border-block"
                placeholder="Globalt søk..."
            />}
            <BTable striped bordered hover responsive size="sm">
                <TableHeader headerGroups={table.getHeaderGroups()} hasSorting={hasSorting}/>
                <TableBody rows={table.getRowModel().rows}/>
            </BTable>
        </>
    )
}
export default BaseTabell
