import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

interface Props {
    field: string
    label: string
    step?: number | string
    min?: number
    max?: number
    required?: boolean
    error: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined
    register: any
}

function NumberInput({field, label, step = "any", max, min, required = false, error, register}: Props) {
    const options = {}
    if (!!max) {
        options[max] = {value: max, message: `Maksimum verdi er ${max}`}
    }
    if (!!min) {
        options[min] = {value: min, message: `Minimum verdi er ${min}`}
    }
    if (required) {
        options[required] = field + " er påkrevet"
    }
    return (
        <div className="form-group col">
            <label className="form-label" htmlFor={field}>{label}</label>
            <input
                type="number"
                step={step}
                max={max}
                min={min}
                className="form-control"
                {...register(field, options)}
            />
            {error && <span className="validation-message invalid">{error.message}</span>}
        </div>
    )
}

export default NumberInput
