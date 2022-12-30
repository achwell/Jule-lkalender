import React from 'react';
import classNames from 'classnames';
import get from 'lodash.get';

import {
    DeepMap,
    FieldError,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {Input, InputProps} from "./Input";
import {FormErrorMessage} from "./FormErrorMessage";

export type FormInputProps<TFormValues> = {
    name: Path<TFormValues>
    label: string
    rules?: RegisterOptions
    register: UseFormRegister<TFormValues>
    errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<InputProps, 'name,label'>

const CheckboxInput = <TFormValues extends Record<string, unknown>>({
                                                                         name,
                                                                         label,
                                                                         register,
                                                                         rules = {},
                                                                         errors,
                                                                         className,
                                                                         ...props
                                                                     }: FormInputProps<TFormValues>): JSX.Element => {
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className={classNames("form-group col", className)} aria-live="polite">
            <div className={classNames("form-check", hasError ? "invalid" : "valid")}>
                <input name={name} type="checkbox" {...register(name)} id="name" className={`form-check-input ${hasError ? 'is-invalid' : ''}`} />
                <label className="form-check-label" htmlFor={name}>{label}</label>
            </div>
            <ErrorMessage
                errors={errors}
                name={name as any}
                render={({message}) => <FormErrorMessage
                    className={classNames({'invalid': hasError})}>{message}</FormErrorMessage>}
            />
        </div>
    );
};
export default CheckboxInput
