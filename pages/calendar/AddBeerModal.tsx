import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form"
import BeerCalendar from "../../types/BeerCalendar";
import DropdownInput from "../../src/components/form/DropdownInput";
import {useEffect} from "react";
import NumberInput from "../../src/components/form/NumberInput";

interface Props {
    calendarId: string
    beers: { key: string, value: string }[]
    show: boolean
    hide: () => void
    callback: (beerCalendar: BeerCalendar) => void
}

const AddBeerModal = ({calendarId, beers, show, hide, callback}: Props) => {


    const {
        control,
        handleSubmit,
        formState: {errors},
        register,
        reset,
        setValue
    } = useForm<BeerCalendar>({defaultValues: {id: undefined, calendarId, day: 1, beerId: undefined}})

    async function updateBeerCalendar(calendarId: string) {
        if(calendarId) {
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
                        <DropdownInput
                            control={control}
                            label="Velg øl"
                            field="beerId"
                            setValue={setValue}
                            error={errors.beerId}
                            options={beers}
                            register={register("beerId", {required: "Du må velge et øl"})}
                        />
                        <NumberInput
                            field="day"
                            label="Dag"
                            step={1}
                            min={1}
                            max={24}
                            required={true}
                            register={register}
                            error={errors.day}/>
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
