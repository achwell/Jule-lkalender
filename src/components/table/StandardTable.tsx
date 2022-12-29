import {ColumnDef} from "@tanstack/table-core";
import BaseTabell from "./BaseTabell";

interface Props<T> {
    columns: ColumnDef<T, any>[]
    data: T[]
    hasFiltering?: boolean
    hasGlobalFilter?: boolean
    hasPagination?: boolean
    rowCallback?: (value: T) => void
}

const StandardTable = <T, >({columns, data, hasFiltering = false, hasGlobalFilter = false, hasPagination = false, rowCallback}: Props<T>) => {
    return <BaseTabell
        data={data}
        columns={columns}
        hasSorting={true}
        hasFiltering={hasFiltering}
        hasGlobalFilter={hasGlobalFilter}
        hasPagination={hasPagination}
        rowCallback={rowCallback}/>
}
export default StandardTable
