import styles from "./Button.module.css"

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

function Button({text, onClick, disabled, ...props}: ButtonProps) {

    return (
        <button 
        {...props}
        onClick={onClick}
        disabled={disabled}
        className={styles.button}
        >
            {text}
        </button>
    )

}

export default Button