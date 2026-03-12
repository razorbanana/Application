export const useEventDate = (dateString: string) => {
    const date = new Date(dateString)

    const datePart = new Intl.DateTimeFormat('en-US', {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(date);

    const timePart = new Intl.DateTimeFormat('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date)

    return {datePart, timePart}
}