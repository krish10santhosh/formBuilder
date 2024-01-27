import { toast } from "react-toastify";

export const ErrorLogger = (api) => (next) => (action) => {
    if (action.payload?.message) {
        toast.success(action.payload?.message, {
            toastId: 'Success',
        })
    }
    if (action.error?.message) {
        toast.error("Rejected");
    }
    return next(action);
}