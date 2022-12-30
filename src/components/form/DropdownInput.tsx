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

export interface Options {
    key: string
    value: string
}

export type FormInputProps<TFormValues> = {
    name: Path<TFormValues>
    label?: string
    options: Options[]
    rules?: RegisterOptions
    register: UseFormRegister<TFormValues>
    errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<InputProps, 'name,label'>

const DropdownInput = <TFormValues extends Record<string, unknown>>({
                                                                        name,
                                                                        label,
                                                                        options,
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
            {label && <label className="form-label" htmlFor={name}>{label}</label>}
            <select {...register(name)}
                    aria-invalid={hasError}
                    className={classNames("form-control", className, {'invalid': hasError})}
                    {...props}>
                {options.map((option) => <option key={option.key} value={option.key}>{option.value}</option>)}
            </select>
            <ErrorMessage
                errors={errors}
                name={name as any}
                render={({message}) => <FormErrorMessage
                    className={classNames({'invalid': hasError})}>{message}</FormErrorMessage>}
            />
        </div>
    );
};
export default DropdownInput
