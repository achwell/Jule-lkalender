import React from 'react';
import classNames from 'classnames';
import get from 'lodash.get';

import {
    Control,
    Controller,
    DeepMap,
    FieldError,
    Path,
    RegisterOptions,
} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {Input, InputProps} from "./Input";
import {FormErrorMessage} from "./FormErrorMessage";

export type FormInputProps<TFormValues> = {
    name: Path<TFormValues>
    label?: string
    rules?: RegisterOptions
    control: Control<TFormValues>
    errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<InputProps, 'name,label'>

const DateInput = <TFormValues extends Record<string, unknown>>({
                                                                     name,
                                                                     label,
                                                                     control,
                                                                     rules,
                                                                     errors,
                                                                     className,
                                                                     ...props
                                                                 }: FormInputProps<TFormValues>): JSX.Element => {
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    const getDate = (date?: Date|string) => {
        if(!date) {
            return undefined
        }
        let value: Date
        if(typeof date === "string") {
            value = new Date(date)
        } else {
            value = date as Date
        }
        return value.getFullYear() + "-" + (value.getMonth() + 1).toString().padStart(2, '0') + "-" + value.getDate().toString().padStart(2, '0');
    }

    return (
        <div className={classNames("form-group col", className)} aria-live="polite">
            {label && <label className="form-label" htmlFor={name}>{label}</label>}
            <Controller<Date>
                name={name}
                control={control}
                render={({ field: {value, onChange} }) => {
                    return (
                        <Input
                            name={name}
                            type="date"
                            value={getDate(value)}
                            onChange={onChange}
                            aria-invalid={hasError}
                            className={classNames({'invalid': hasError})}
                            {...props}
                        />
                    );
                }}
            />
            <ErrorMessage
                errors={errors}
                name={name as any}
                render={({message}) => <FormErrorMessage
                    className={classNames({'invalid': hasError})}>{message}</FormErrorMessage>}
            />
        </div>
    );
};
export default DateInput
