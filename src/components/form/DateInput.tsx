import {Control, Controller, FieldError} from "react-hook-form";
import DatePicker, {DateObject} from "react-multi-date-picker";
import {Form} from "react-bootstrap";

type Props = {
    field: string
    label: string
    error?: FieldError
    control: Control<any>
};

const DateInput = ({field, label, error, control}: Props) => {
    return <Form.Group controlId={field} className="form-group col">
        <Form.Label>{label}</Form.Label>
        <Controller
            control={control}
            name={field}
            rules={{required: true}}
            render={({
                         field: {onChange, value},
                         fieldState: {invalid}, //optional
                     }) => <>
                         <DatePicker
                             id={field}
                             value={value || ""}
                             onChange={(date: DateObject) => onChange(date ? date.toDate(): undefined)}
                             inputClass={`form-control ${invalid || error ? "invalid" : ""}`}
                             format="DD.MM.YYYY"
                         />
                         {(invalid || error ) && <span className="validation-message invalid">{error?.message}</span>}
                     </>}
        />
    </Form.Group>;
}

export default DateInput
