type FormButtonProps = {
    text: string,
    onClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    disabled?: boolean
}

export default function FormButton ({text, onClick, disabled=false}: FormButtonProps){

    const basicButtonStyles = "mx-3 mt-4 text-gray-700 hover:text-blue-600 cursor-pointer px-3 py-2 rounded-lg border border-gray-300"
    
    return (
       <button 
            className={`${basicButtonStyles}`}
            disabled={disabled}
            onClick={onClick}>
            {text}
        </button>
    )
}