import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { FaShareSquare } from 'react-icons/fa';
import { FaBookmark, FaRegBookmark  } from "react-icons/fa";
import { addToWishlist, removeFromWishlist } from '../../../slices/WishlistSlice';

const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { wishlist } = useSelector((state) => state.wishlist); 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Instructor can't buy course...");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })

    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied...");
    }

    const addCourse = async() => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Instructor can't add course to wishlist...");
            return;
        }
        if (token) {
            dispatch(addToWishlist(course));
            return;
        }
        toast.error("Please login to add course to wishlist...");
    }
    const removeCourse = async() => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Instructor can't remove course from wishlist...");
            return;
        }
        if (token) {
            dispatch(removeFromWishlist(course._id));
            return;
        }
        toast.error("Please login to remove course from wishlist...");
    }

    const handleWishlist = async() => {
        if(typeof wishlist.find((item) => item._id === course._id) === 'object'){
            removeCourse()
        }
        else {
            addCourse();
        }
           
    }
    return (
        <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
            <img src={course?.thumbnail} alt="thumbnail Image" className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"/>
            <div className="px-4 flex justify-between items-start">
                <span className="space-x-3 pb-4 text-3xl font-semibold">Rs. {course?.price}</span>
                <span onClick={handleWishlist}>
                    {
                        wishlist.find((item) => item._id === course._id) ? (<FaBookmark className='text-3xl flex items-center text-yellow-100 cursor-pointer'/>) : (< FaRegBookmark className='text-3xl flex items-center text-yellow-100 cursor-pointer'/>)
                    }
                </span>
            </div>
            <div className="flex flex-col gap-4">
                <button 
                    onClick={user && course?.studentsEnrolled.includes(user._id) ? () => navigate('/dashboard/enrolled-courses') : () => handleBuyCourse()}
                    className='bg-yellow-100 py-2 px-3 rounded text-richblue-800 font-semibold text-lg cursor-pointer'
                >
                    {
                        user && course?.studentsEnrolled.includes(user._id) ? ("Go To Course") : ("Buy Now")
                    }
                </button>
                {
                    !course?.studentsEnrolled?.includes(user?._id) && <button onClick={handleAddToCart}  className='bg-richblack-800 py-2 px-3 rounded text-richblack-5 font-semibold text-lg cursor-pointer'>Add To Cart</button>
                }
            </div>

            <div>
                <p className="pb-3 pt-2 text-center text-sm text-richblack-25">30-Days Money-Back Guarantee</p>
                <p className={`my-2 text-xl font-semibold `}>This course includes:</p>
                <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                    {
                        course?.instructions?.map((instruction, index) => (
                            <p key={index} className={`flex gap-2`}>{instruction}</p>
                        ))
                    }
                </div>
                <div className="text-center" >
                    <button onClick={handleShare} className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "><FaShareSquare size={15} />Share</button>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsCard