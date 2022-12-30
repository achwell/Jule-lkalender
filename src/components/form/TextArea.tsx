import React, {DetailedHTMLProps, TextareaHTMLAttributes} from 'react';
import classNames from 'classnames';
import {RegisterOptions, DeepMap, FieldError, UseFormRegister, Path,} from 'react-hook-form';
import get from 'lodash.get';
import {ErrorMessage} from '@hookform/error-message';
import {FormErrorMessage} from "./FormErrorMessage";

export type FormTextareaProps<TFormValues> = {
    id: string;
    name: Path<TFormValues>;
    label: string;
    className?: string;
    rules?: RegisterOptions;
    register?: UseFormRegister<TFormValues>;
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement>;

const TextArea = <TFormValues extends Record<string, any>>({
                                                                    id,
                                                                    name,
                                                                    label,
                                                                    register,
                                                                    rules,
                                                                    errors,
                                                                    className,
                                                                    ...props
                                                                }: FormTextareaProps<TFormValues>): JSX.Element => {
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className={classNames("form-group col fullWidth", className)} aria-live="polite">
            {label && <label className="form-label" htmlFor={name}>{label}</label>}
            <textarea
                id={id}
                name={name}
                aria-label={label}
                aria-invalid={!!(hasError && errorMessages)}
                className={classNames('fullWidth', hasError ? '' : 'invalid')}
                {...props}
                {...(register && register(name, rules))}
            />
            <ErrorMessage
                errors={errors}
                name={name as any}
                render={({message}) => <FormErrorMessage className={classNames({'invalid': hasError})}>{message}</FormErrorMessage>}
            />
        </div>
    );
};
export default TextArea
