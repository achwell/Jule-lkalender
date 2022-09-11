import {ColumnDef} from "@tanstack/table-core";
import BaseTabell from "./BaseTabell";

interface Props<T> {
    columns: ColumnDef<T, any>[]
    data: T[]
    hasFiltering?: boolean
    hasGlobalFilter?: boolean
    hasPagination?: boolean
}

const StandardTable = <T, >({columns, data, hasFiltering = false, hasGlobalFilter = false, hasPagination = false}: Props<T>) => {
    return <BaseTabell
        data={data}
        columns={columns}
        hasSorting={true}
        hasFiltering={hasFiltering}
        hasGlobalFilter={hasGlobalFilter}
        hasPagination={hasPagination}/>
}
export default StandardTable
