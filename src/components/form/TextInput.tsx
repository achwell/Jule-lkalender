import {FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn} from "react-hook-form";
import {Form} from "react-bootstrap";

interface Props {
    field: string
    label: string
    error: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined
    register: UseFormRegisterReturn<string>
}

function TextInput({ field, label, error, register }: Props) {
    return <Form.Group controlId={field} className="form-group col">
        <Form.Label>{label}</Form.Label>
        <Form.Control type="text" className={error ? "invalid" : ""} {...register}/>
        {error && <span className="validation-message invalid">{error.message}</span>}
    </Form.Group>;
}
export default TextInput
