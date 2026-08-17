interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

function Button({text, onClick, disabled, className, ...props}: ButtonProps) {

    return (
        <button 
        {...props}
        onClick={onClick}
        disabled={disabled}
        className={className}
        >
            {text}
        </button>
    )

}

export default Button