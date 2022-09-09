import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

interface Props {
    beerName?: string
    calendarName?: string
    calendarYear?: number
    show: boolean
    hide: () => void
    callback: () => void
}

const RemoveBeerModal = ({beerName, calendarName, calendarYear, show, hide, callback}: Props) => {
    return (
        <Modal
            show={show}
            onHide={hide}
            centered
            dialogClassName="modal-90w">
            <Modal.Header closeButton/>
            <Modal.Title>Vil du fjerne {beerName}</Modal.Title>
            <Modal.Body>Er du sikker på at du vil fjerne {beerName} fra kalender {calendarYear}: {calendarName}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>
                    Avbryt
                </Button>
                <Button variant="primary" onClick={callback}>
                    Ja, slett {beerName}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default RemoveBeerModal
