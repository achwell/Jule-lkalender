import {Dropdown, DropdownButton, Form} from "react-bootstrap";
import {
    Control,
    Controller,
    FieldError, FieldErrorsImpl, Merge,
    UseFormRegisterReturn,
    UseFormSetValue
} from "react-hook-form";

interface Props {
    field: string
    label: string
    options: { key: string, value: string }[]
    register: UseFormRegisterReturn<string>
    setValue: UseFormSetValue<any>
    error: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined
    control: Control<any>
}

const DropdownInput = ({field, label, options, register, setValue, error, control}: Props) => {
    return <Form.Group controlId={field} className="form-group col">
        <Controller
            control={control}
            name={field}
            render={({field: {onChange, onBlur, value, ref}, fieldState: {invalid, error},}) => (
                <DropdownButton
                    {...register}
                    itemRef={ref.name}
                    id={field}
                    title={label}
                    className={error || invalid ? "invalid" : "valid"}
                    onChange={onChange}
                    onBlur={onBlur}
                    defaultValue={value}
                >
                    {options.map((value, index) => (
                        <Dropdown.Item as="button" type="button" key={index}
                                       onClick={() => setValue(field, value.key)}>{value.value}</Dropdown.Item>
                    ))}
                </DropdownButton>
            )}
        />
        {error && <span className="validation-message invalid">{error.message}</span>}
    </Form.Group>;
}

export default DropdownInput
