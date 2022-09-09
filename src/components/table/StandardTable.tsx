import {ColumnDef} from "@tanstack/table-core";
import BaseTabell from "./BaseTabell";

interface Props<T> {
    columns: ColumnDef<T, any>[]
    data: T[]
    hasFiltering?: boolean
}

const StandardTable = <T, > ({columns, data, hasFiltering = false}: Props<T>) => {
    return <BaseTabell data={data} columns={columns} hasSorting={true} hasFiltering={hasFiltering}/>
}
export default StandardTable
