import {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {Layout} from "../../src/components/Layout";
import UsersTable from "../../src/components/UsersTable";
import User from "../../types/User";
import UserForm from "../../src/components/UserForm";
import {alertService, userService} from "../../src/services";

const Users: NextPage = () => {
    const ref = useRef<UserForm>();

    const [show, setShow] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User>()
    const [users, setUsers] = useState<User[]>([])

    console.log({users})

    useEffect(() => reload(), [])

    const viewUser = (value: User) => {
        setSelectedUser(value)
        setShow(true)
    }

    const save = () => {
        if(ref.current) {
            ref.current.submit()
        }
        reload()
        close()
    }

    const reload = () => {
        userService.getAll()
            .then(value => setUsers(value))
            .catch(reason => alertService.error(reason))
    }

    const close = () => {
        setSelectedUser(undefined)
        setShow(false)
    }

    return (
        <Layout>
            <Modal
                show={show}
                onHide={close}
                centered
                dialogClassName="modal-90w">
                <Modal.Header closeButton/>
                <Modal.Title>{selectedUser?.name}</Modal.Title>
                <Modal.Body><UserForm user={selectedUser} isAdmin={true} showButtons={false} ref={ref}/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={() => save()}>
                        Lagre
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="col-md-6 offset-md-3 mt-5">
                <h1>Alle brukere</h1>
                <UsersTable users={users} viewUser={viewUser}/>
            </div>
        </Layout>
    )
}
export default Users
