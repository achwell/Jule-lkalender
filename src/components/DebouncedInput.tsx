import React, {InputHTMLAttributes, useEffect, useState} from "react";

interface Props {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

const DebouncedInput = ({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }: Props & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)}/>
    )
}
export default DebouncedInput
