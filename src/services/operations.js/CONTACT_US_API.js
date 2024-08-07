import toast from 'react-hot-toast';
import { setLoading } from '../../slices/ContactSlice'
import { contactusEndpoint } from "../api";
import { apiConnector }  from '../apiConnector'

export const contactUs = (firstName, lastName, email, message, phoneNumber ) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Sending message...")
        try {
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {firstName, lastName, email, message, phoneNumber})
            console.log("CONTACT US API RESPONSE............", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.dismiss(toastId);
            toast.success("Message sent successfully");
            dispatch(setLoading(false));
        } catch (error) {
            console.log("CONTACT US API ERROR............", error);
            toast.error(error?.response?.data?.message);
            dispatch(setLoading(false));
        }
    }
}