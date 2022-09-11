import React from "react";
import {Pagination} from "react-bootstrap";
import {Table} from "@tanstack/react-table";

interface Props<T> {
    table: Table<T>
}

const TablePagination = <T, >({table}: Props<T>) => {
    return (
        <>
            <div className="h-2"/>
            <Pagination>
                <Pagination.First onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}/>
                <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}/>
                <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}/>
                <Pagination.Last onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                 disabled={!table.getCanNextPage()}/>
            </Pagination>
            <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </strong>
            </span>
            <span className="flex items-center gap-1">
                | Go to page:
                <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                    }}
                    className="border p-1 rounded w-16"
                />
            </span>
            <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
        </>
    )
}
export default TablePagination
