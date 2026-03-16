type ConfirmationModalProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleDelete: () => void
}

export default function ConfirmationModal({isOpen, setIsOpen, handleDelete}: ConfirmationModalProps){
    return(
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-lg font-semibold mb-4">Delete event?</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete this item?
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                        >
                        Cancel
                        </button>

                        <button
                        onClick={() => {
                            handleDelete()
                            setIsOpen(false)
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
                )}
        </>
    )
}