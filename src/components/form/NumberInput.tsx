import React from 'react';
import classNames from 'classnames';
import get from 'lodash.get';

import {
    RegisterOptions,
    DeepMap,
    FieldError,
    UseFormRegister,
    Path,
} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {Input, InputProps} from "./Input";
import {FormErrorMessage} from "./FormErrorMessage";

export type FormInputProps<TFormValues> = {
    name: Path<TFormValues>
    label?: string
    step?: number | string
    min?: number
    max?: number
    required?: boolean
    rules?: RegisterOptions
    register: UseFormRegister<TFormValues>
    errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<InputProps, 'name,label'>

const NumberInput = <TFormValues extends Record<string, unknown>>({
                                                                       name,
                                                                       label,
                                                                       step = "any",
                                                                       min,
                                                                       max,
                                                                       register,
                                                                       rules,
                                                                       errors,
                                                                       className,
                                                                       ...props
                                                                   }: FormInputProps<TFormValues>): JSX.Element => {
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className={classNames("form-group col", className)} aria-live="polite">
            {label && <label className="form-label" htmlFor={name}>{label}</label>}
            <Input
                name={name}
                type="number"
                step={step}
                max={max}
                min={min}
                aria-invalid={hasError}
                className={classNames({'invalid': hasError})}
                {...props}
                {...(register(name, rules))}
            />
            <ErrorMessage
                errors={errors}
                name={name as any}
                render={({message}) => <FormErrorMessage className={classNames({'invalid': hasError})}>{message}</FormErrorMessage>}
            />
        </div>
    );
};
export default NumberInput
