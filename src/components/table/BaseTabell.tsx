import React, {useState} from "react"
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import {ColumnDef, TableOptions} from "@tanstack/table-core"
import {Table} from "react-bootstrap";
import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import {fuzzyFilter} from "./utils"
import DebouncedInput from "../DebouncedInput"
import TablePagination from "./TablePagination"

interface Props<T> {
    columns: ColumnDef<T, any>[]
    data: T[]
    hasSorting?: boolean
    hasFiltering?: boolean
    hasGlobalFilter?: boolean
    hasPagination?: boolean
    rowCallback?: (value: T) => void
}

const BaseTabell = <T, >({
                             columns,
                             data,
                             hasSorting = true,
                             hasFiltering = false,
                             hasGlobalFilter = false,
                             hasPagination = true,
                             rowCallback
                         }: Props<T>) => {

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
        debugTable: false,
        debugHeaders: false,
        debugColumns: false,
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
            getFacetedRowModel: getFacetedRowModel(),
            getFacetedUniqueValues: getFacetedUniqueValues(),
            getFacetedMinMaxValues: getFacetedMinMaxValues(),
            state: {
                ...options.state,
                columnFilters,
                globalFilter
            }
        }
    }

    if (hasPagination) {
        options = {
            ...options,
            getPaginationRowModel: getPaginationRowModel(),
        }
    }
    const table = useReactTable<T>(options)

    return (
        <>
            {hasFiltering && hasGlobalFilter && <><DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className="p-2 font-lg shadow border border-block"
                placeholder="Globalt søk..."
            />
                <div className="h-2"/>
            </>
            }

            <Table striped bordered hover responsive size="sm">
                <TableHeader
                    table={table}
                    hasSorting={hasSorting}
                    hasFiltering={hasFiltering}/>
                <TableBody rows={table.getRowModel().rows} rowCallback={rowCallback}/>
            </Table>
            {hasPagination && table.getPageCount() > 1 && <TablePagination table={table}/>}
        </>
    )
}
export default BaseTabell
