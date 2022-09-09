import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {Form} from "react-bootstrap";

interface Props {
    field: string
    label: string
    step?: number | string
    error?: FieldError
    register: UseFormRegisterReturn<string>
}

function NumberInput({field, label, step = "any", error, register}: Props) {
    return <Form.Group controlId={field} className="form-group col">
        <Form.Label>{label}</Form.Label>
        <Form.Control type="number" step={step} className={error ? "invalid" : ""} {...register}/>
        {error && <span className="validation-message invalid">{error.message}</span>}
    </Form.Group>;
}

export default NumberInput
