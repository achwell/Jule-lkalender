import {FC} from "react";
import {createColumnHelper} from "@tanstack/table-core";
import User from "../../types/User";
import StandardTable from "./table/StandardTable";

const UsersTable: FC<{ users: User[], viewUser: (user: User) => void }> = ({users, viewUser}) => {

    const columnHelper = createColumnHelper<User>()
    const columns = [
        columnHelper.accessor(row => row.name, {id: "name", header: () => <span>Navn</span>}),
        columnHelper.accessor(row => row.email, {id: "email", header: () => <span>E-post</span>}),
        columnHelper.accessor(row => row.role, {id: "role", header: () => <span>Rolle</span>}),
        columnHelper.accessor(row => row.beers, {id: "beers",
            header: () => <span>Antall øl</span>,
            cell: ({row: {original: {beers}}}) => <span>{!!beers ? beers.length : 0}</span>
        }),]

    return <StandardTable<User> columns={columns} data={users} hasFiltering={true} rowCallback={viewUser}/>

}
export default UsersTable
