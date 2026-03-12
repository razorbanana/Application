type InputLabelProps = {
    name: string,
    label: string,
    optional?: boolean,
}

export default function InputLabel({name, label, optional}: InputLabelProps){
    const basicLabelStyles = "text-sm text-black font-semibold" 

    return (
        <label htmlFor={name} className={`${basicLabelStyles}`}>{label} {!optional && <span className="text-red-500">*</span>}</label>
    )
}