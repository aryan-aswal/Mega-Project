import toast from 'react-hot-toast'
import { setLoading, setToken } from '../../slices/authSlice'
import { endpoints } from '../api'
import { apiConnector } from '../apiConnector'
import { setUser } from '../../slices/ProfileSlice'
import { setCourse } from '../../slices/courseSlice'

export const login = (email, password, navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", endpoints.LOGIN_API, {email, password});
           
            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
    
            dispatch(setUser({ ...response.data.user, image: userImage }));

            localStorage.setItem("user", JSON.stringify(response.data.user));  
            localStorage.setItem("token", JSON.stringify(response.data.token)); 

            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
}

export const logout = (navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        dispatch(setToken(null));
        dispatch(setUser(null));

        localStorage.removeItem("token");  
        localStorage.removeItem("user");    

        toast.success("Logged Out")
        navigate('/')
        dispatch(setLoading(false));
    }
}

export const signup = (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("loading...");
        try {
            const response = await apiConnector("POST", endpoints.SIGNUP_API, 
                { accountType, firstName, lastName, email, password, confirmPassword, otp } 
            )

            console.log("SIGNUP API RESPONSE............", response);
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successfull");
            navigate("/login");

        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error(error?.response?.data?.message);
            navigate("/signup")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const sendOTP = (email, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("loading...");
        try {
            const response = await apiConnector("POST", endpoints.SENDOTP_API, {email});
            console.log("SEND OTP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate('/verify-email')
        } catch (error) {
            console.log("SEND OTP API ERROR............", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const resetPasswordToken = (email, setEmailSent) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('loading...');
        try {
            const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, {email});
            console.log("RESET PASSWORD TOKEN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch (error) {
            console.log("RESETPASSTOKEN ERROR............", error)
            toast.error("Failed To Send Reset Email")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const updatePassword = (password, confirmPassword, token, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("loading...");
        try {
            const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, {password, confirmPassword, token});
            console.log("RESET PASSWORD API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password Updated Successfully");
            navigate('/login');
        } catch (error) {
            console.log("RESET PASSWORD API ERROR............", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastID)
        dispatch(setLoading(false));

    }
}