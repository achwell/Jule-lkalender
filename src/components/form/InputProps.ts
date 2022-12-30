import {InputHTMLAttributes} from "react";
import {FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    register: UseFormRegister<FieldValues>;
    type: "text" | "email" | "number" | "date" | "checkbox";
}
