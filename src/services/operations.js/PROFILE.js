import toast from "react-hot-toast";
import { profileEndpoints, settingsEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { setLoading, setUser } from "../../slices/ProfileSlice";
import { logout } from "./AUTH_API";

export const uploadProfileImage = (image, token, user) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Updating Profile Image...")

        try {
            const formData = new FormData();
            formData.append('image', image);
            const response = await apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, formData, { Authorization: `Bearer ${token}`});
            console.log("UPLOAD PROFILE IMAGE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            const { data } = response;
            const updatedUser = {...user, image: data.data.image};

            dispatch(setUser(updatedUser));
            localStorage.setItem('user', JSON.stringify(updatedUser));  
            toast.success("Profile Image Uploaded Successfully");
        } catch (error) {
            console.log("UPLOAD PROFILE IMAGE API ERROR............", error);
            toast.error(error.response.data.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const updateProfile = (profileData, user, token) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Updating Profile Information...")
        try {
            const response = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, profileData, {Authorization: `Bearer ${token}`});
            console.log("UPDATE PROFILE API RESPONSE............", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            const { data } = response;
            console.log(data.userDetails);
            dispatch(setUser(data.userDetails));
            localStorage.setItem('user', JSON.stringify(data.userDetails));
            toast.success("Profile Information Updated Successfully");
        
        } catch (error) {
            console.log("UPDATE PROFILE API ERROR............", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const updatePassword = (passwordInfo, token) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Updating Password")
        try {
            const response = await apiConnector("PUT", settingsEndpoints.CHANGE_PASSWORD_API, passwordInfo, {Authorization: `Bearer ${token}`});
            console.log("UPDATE PASSWORD API RESPONSE............", response);
            toast.success("Password updated successfully");
        } catch (error) {
            console.log("UPDATE PASSWORD API ERROR............", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const deleteAccount = (token, navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Deleting Your Account");
        try {
            const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API, {}, {Authorization: `Bearer ${token}`});
            console.log("DELETE ACCOUNT API RESPONSE............", response);
            toast.success("Account Deleted Successfully");

            localStorage.removeItem('user');
            localStorage.removeItem('token');

            dispatch(logout(navigate))

        } catch (error) {
            console.log("DELETE ACCOUNT API ERROR............", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("GET", profileEndpoints.GET_ALL_INSTRUCTOR_DASHBOARD_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
      result = response?.data?.data
    } catch (error) {
      console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
      toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
  }
  
