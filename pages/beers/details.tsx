import {NextPage} from "next"
import Link from "next/link";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {Button, Spinner, Table} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Moment from 'moment';
import Beer from "../../types/Beer"
import {Layout} from "../../src/components/Layout";
import {useEffect, useState} from "react";
import {alertService, beerService, userService} from "../../src/services";

const Details: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router

    const [error, setError] = useState<number>()
    const [beer, setBeer] = useState<Beer>()

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    async function updateBeer(id: string) {
        const session = await getSession()
        const sessionUser = await userService.getByEmail(session!.user!.email!)
        if (!session || !session.user || !session.user.email) {
            router.push("/api/auth/signin")
            return
        }

        const beer = await beerService.getById(id)

        if(!beer) {
            setError(404)
            return
        }
        const beerOwner = await userService.getById(beer.userId)


        if(!beerOwner || !session || !session.user) {
            setError(403)
            return
        }

        if(sessionUser.role === "ADMIN" || beerOwner.email === sessionUser.email) {
            setBeer(beer)
            setError(undefined)
        } else {
            setError(403)
        }
    }

    useEffect(() => {
        if(!id) {
            setBeer(undefined)
        } else {
            updateBeer(id as string);
        }
    }, [id])

    if (error) {
        return <div>{error}</div>
    }

    if (!beer) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    const deleteBeer = () => {
        setShowDeleteDialog(false)
        beerService.delete(beer.id)
            .then(() => {
            alertService.success('Beer deleted', { keepAfterRouteChange: true });
            router.push('.');
        })
            .catch(reason => alertService.error(reason));
    }

    return (
        <Layout>
            <Modal
                show={showDeleteDialog}
                onHide={() => setShowDeleteDialog(false)}
                centered
                dialogClassName="modal-90w">
                <Modal.Header closeButton/>
                <Modal.Title>Vil du slette {beer.name}</Modal.Title>
                <Modal.Body>Er du sikker på at du vil fjerne {beer.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={deleteBeer}>
                        Ja, slett {beer.name}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="col-md-6 offset-md-3 mt-5">
                <h1>{beer?.name}</h1>

                <Table className="table table-striped">
                    <thead>
                    <tr>
                        <th style={{width: "40%"}}></th>
                        <th style={{width: "60%"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Stil</td>
                        <td>{beer?.style}</td>
                    </tr>
                    <tr>
                        <td>Beskrivelse</td>
                        <td>{beer?.description}</td>
                    </tr>
                    <tr>
                        <td>Abv</td>
                        <td>{beer?.abv}</td>
                    </tr>
                    <tr>
                        <td>Ibu</td>
                        <td>{beer?.ibu}</td>
                    </tr>
                    <tr>
                        <td>Ebc</td>
                        <td>{beer?.ebc}</td>
                    </tr>
                    <tr>
                        <td>Oppskrift</td>
                        <td>{beer?.recipe}</td>
                    </tr>
                    <tr>
                        <td>Untapped</td>
                        <td>{beer?.untapped}</td>
                    </tr>
                    <tr>
                        <td>Bryggedato</td>
                        <td>{beer?.brewedDate ? Moment(beer?.brewedDate).format("DD.MM.YYYY") : ""}</td>
                    </tr>

                    <tr>
                        <td>Tappedato</td>
                        <td>{beer?.bottleDate ? Moment(beer?.bottleDate).format("DD.MM.YYYY") : ""}</td>
                    </tr>
                    </tbody>
                </Table>
                <Button className="btn btn-sm btn-danger btn-delete-user"
                        onClick={() => setShowDeleteDialog(true)}>Slett!</Button>
                <Link href={{pathname: "/beers/edit/", query: {id: beer?.id}}} className="btn btn-sm btn-primary mr-1">
                    Rediger
                </Link>
                <Link href={{pathname: "/beers/"}} className="btn btn-sm btn-primary mr-1 active">
                    Tilbake
                </Link>
            </div>
        </Layout>
    )
}

export default Details
