import {useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form"
import BeerCalendar from "../../types/BeerCalendar";
import NumberInput from "../../src/components/form/NumberInput";
import DropdownInput, {Options} from "../../src/components/form/DropdownInput";

interface Props {
    calendarId: string
    beers: Options[]
    show: boolean
    hide: () => void
    callback: (beerCalendar: BeerCalendar) => void
}

const AddBeerModal = ({calendarId, beers, show, hide, callback}: Props) => {

    const {handleSubmit, formState: {errors}, register, reset} = useForm<BeerCalendar>({defaultValues: {id: undefined, calendarId, day: 1, beerId: undefined}})

    async function updateBeerCalendar(calendarId: string) {
        if (calendarId) {
            reset({id: undefined, calendarId, day: 1, beerId: undefined})
        }

    }

    useEffect(() => {
        updateBeerCalendar(calendarId)
    }, []);


    const addBeer = (data: BeerCalendar) => {
        callback(data)
    }

    return (
        <Modal
            show={show}
            onHide={hide}
            centered
            dialogClassName="modal-90w">
            <Modal.Header closeButton/>
            <Modal.Title>Legg øl til i kalender</Modal.Title>
            <Form onSubmit={handleSubmit(addBeer)}>
                <Modal.Body>
                    Her listes alle øl som ikke har en kalender. Du kan velge øl og hvilken dag den skal komme på i den
                    gitte kalenderen.
                    <div className="form-row">
                        <DropdownInput<BeerCalendar> id="beerId" name="beerId" label="Velg øl" options={beers} register={register} rules={{required: "Du må velge et øl"}} errors={errors}/>
                        <NumberInput<BeerCalendar>
                            id="day"
                            name="day"
                            label="Dag"
                            placeholder="Dag"
                            step={1}
                            min={1}
                            max={24}
                            register={register}
                            rules={{
                                required: "Dag er påkrevet",
                                min: {value: 1, message: "Tidligste dag er 1"},
                                max: {value: 24, message: "Seneste dag er 24"}
                            }}
                            errors={errors}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" type="submit">
                        Lagre
                    </Button>
                    <Button className="btn btn-secondary active" onClick={hide}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
export default AddBeerModal
