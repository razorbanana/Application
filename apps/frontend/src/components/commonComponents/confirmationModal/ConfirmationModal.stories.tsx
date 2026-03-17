import { useState } from "react"
import ConfirmationModal from "./ConfirmationModal"

export default {
  title: "Components/ConfirmationModal",
  component: ConfirmationModal,
}

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handleDelete = () => {alert("Deleting...")}

  return (
    <ConfirmationModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleDelete={handleDelete}
    />
  )
}