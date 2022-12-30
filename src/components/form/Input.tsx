import React, {FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes,} from 'react';
import classNames from 'classnames';

export type InputType = 'text' | 'email' | 'number' | 'password';

export type InputProps = {
    id: string;
    name: string;
    label: string;
    type?: InputType;
    className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            name,
            label,
            type = 'text',
            className = '',
            placeholder,
            ...props
        },
        ref
    ) => {
        return (
            <input
                id={id}
                ref={ref}
                name={name}
                type={type}
                aria-label={label}
                placeholder={placeholder}
                className={classNames(['form-control', className,])}
                {...props}
            />
        );
    }
);
