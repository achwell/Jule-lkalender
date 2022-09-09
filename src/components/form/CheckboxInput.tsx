import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {Form, FormCheck} from "react-bootstrap";

interface Props {
    field: string
    label: string
    error?: FieldError
    register: UseFormRegisterReturn<string>
}

function CheckboxInput({ field, label, error, register }: Props) {
    return <Form.Group controlId={field} className="form-group col">
        <FormCheck id={field} label={label} className={error ? "invalid" : "valid"} {...register}/>
        {error && <span className="validation-message invalid">{error.message}</span>}
    </Form.Group>;
}
export default CheckboxInput
