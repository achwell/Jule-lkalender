import {FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn} from "react-hook-form";
import {Form} from "react-bootstrap";

interface Props {
    field: string
    label: string
    rows?: number
    cols?: number
    error: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined
    register: UseFormRegisterReturn<string>
}

function TextArea({ field, label, rows, cols, error, register }: Props) {
    return <Form.Group controlId={field} className="form-group col" style={{width: "100%"}}>
        <Form.Label>{label}</Form.Label>
        <textarea id={field} rows={rows} cols={cols} className={error ? "invalid" : ""} style={{width: "100%"}} {...register}></textarea>
        {error && <span className="validation-message invalid">{error.message}</span>}
    </Form.Group>;
}
export default TextArea
