import InputLabel from "./InputLabel"

type RowInputProps = {
    name: string,
    label: string,
    placeholder?: string,
    value: string | number | undefined,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    optional?: boolean,
    type?: "text" | "password" | "textarea" | "number" | "date" | "time",
    error?: string
}

export default function RowInput({name, label, value, placeholder, handleInputChange, type="text", optional=false, error=""}: RowInputProps){
    const basicInputStyles = `text-gray-700 px-3 py-2 rounded-lg border border-gray-300 w-full ${
        error ? "border-red-500 bg-red-50" : "border-gray-300"
    }`

    return(
        <div className="mr-2">
            <InputLabel name={name} label={label} optional={optional} />
            { type != "textarea" ?
                <input 
                    className={`${basicInputStyles}`}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    value={value}
                    type={type}
                    onChange={handleInputChange}
                />
                :
                <textarea 
                    className={`${basicInputStyles}`}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                />
            }
            {error && <p className="text-red-500 text-sm mb-2 ">{error}</p>}
        </div>
    )
}