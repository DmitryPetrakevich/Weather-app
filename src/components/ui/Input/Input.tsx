import { useState } from "react";

interface InputProps {
  value: string
  placeholder?: string
  type?: string
onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({value, onChange, placeholder, type="text", ...props}: InputProps) {

    return (
        <input
        {...props}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        />
    )
}

export default Input;