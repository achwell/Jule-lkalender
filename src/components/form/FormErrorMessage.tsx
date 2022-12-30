import React, { FC } from 'react';
import classNames from 'classnames';

export type FormErrorMessageProps = {
    className?: string;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({children, className}) => (
    <span
        className={classNames('validation-message', className)}>
        {children}
    </span>
);
