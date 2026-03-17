import * as yup from "yup"
import type { CreateEventRequestDto } from "../../types/dtos/requests/CreateEventRequestDto"

const schema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").max(64, "Name is too long").required("Name is required"),
  description: yup.string().min(16, "Description must be at least 16 characters").max(512, "Description is too long").required("Description is required"),
  location: yup.string().min(2, "Location must be at least 2 characters").max(64, "Location is too long").required("Location is required"),
  eventDate: yup.date().min(new Date(), "Event date must be in the future").required("Event date is required"),
  capacity: yup.number().optional().positive("Capacity must be positive").integer("Capacity must be an integer"),
  tags: yup.array().of(yup.string()).max(5, "Up to 5 tags can be selected")
})

export const validateField = async (
  data: CreateEventRequestDto, 
  setErrors: React.Dispatch<React.SetStateAction<{
      name: string;
      description: string;
      location: string;
      eventDate: string;
      capacity: string;
      tags: string
  }>>
  ,field: string, value: any) => {
    try {
      await schema.validateAt(field, { ...data, [field]: value })
      setErrors(prev => ({ ...prev, [field]: "" })) 
    } catch (err: any) {
      setErrors(prev => ({ ...prev, [field]: err.message })) 
    }
  }

  export const validateAll = async (
  data: CreateEventRequestDto,
  setErrors: React.Dispatch<
    React.SetStateAction<{
      name: string
      description: string
      location: string
      eventDate: string
      capacity: string
      tags: string
    }>
  >
) => {
  try {
    await schema.validate(data, { abortEarly: false })

    setErrors({
      name: "",
      description: "",
      location: "",
      eventDate: "",
      capacity: "",
      tags: ""
    })
  } catch (err: any) {
    const newErrors = {
      name: "",
      description: "",
      location: "",
      eventDate: "",
      capacity: "",
      tags: ""
    }

    err.inner.forEach((error: any) => {
      if (error.path) {
        newErrors[error.path as keyof typeof newErrors] = error.message
      }
    })

    setErrors(newErrors)
  }
}