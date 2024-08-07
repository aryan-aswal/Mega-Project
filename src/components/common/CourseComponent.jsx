import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { matchPath, useLocation } from 'react-router-dom';
import ReactStars from 'react-stars'
import { addToCart, removeFromCart } from '../../slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../slices/WishlistSlice';
import { useDispatch } from 'react-redux';
import { fetchCourseDetails } from '../../services/operations.js/courseDetailsAPI';

const CourseComponent = ({ courseId }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [ course, setCourse ] = useState(null);

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }

    const [rating, setRating] = useState(0);

    const getAverageRating = (course) => {
        let totalRating = 0;
        course?.ratingAndReviews?.forEach((rating) => {
            totalRating += rating.rating;
        })
        return totalRating / course?.ratingAndReviews?.length;
    }

    const getCourseDetails = async() => {
        try {
            const response = await fetchCourseDetails(courseId);
            setCourse(response?.data);
        } catch (error) {
            console.log("ERROR --> ", error);
        }
    }

    useEffect(() => {
        getCourseDetails();
        setRating(getAverageRating(course));
    }, []); 

    const addHandler = () => {
        if(matchRoute('/dashboard/bookmarked-courses')) {
            dispatch(addToCart(course));
            dispatch(removeFromWishlist(course?._id));
        } else {
            dispatch(addToWishlist(course));
            dispatch(removeFromCart(course._id));
        }
    }

    const removeHandler = () => {
        if(matchRoute('/dashboard/bookmarked-courses')) {
            dispatch(removeFromWishlist(course._id));
        } else {
            dispatch(removeFromCart(course._id))
        }
    }





    return (
        <div className="flex bg-gray-900 text-white p-4 rounded-lg shadow-lg justify-between gap-x-2">
            <div className="w-[400px]">
                <img src={course?.thumbnail} alt="Course Thumbnail" className="rounded-md h-[200px]" />
            </div>

            <div className="w-2/3 pl-4 flex flex-col justify-between">
                <div>
                    <h1 className="font-bold text-lg">{course?.courseName}</h1>
                    <p className="text-richblack-400 font-semibold text-sm">{course?.category?.name}</p>
                    <div className="flex items-center">
                        <ReactStars
                            count={5}
                            value={rating}
                            size={24}
                            color2={'#ffd700'}
                            color1='gray'
                            half={true}
                            edit={false}
                        />
                        <p className="ml-2 text-richblack-400">{course?.ratingAndReviews?.length} Rating</p>
                    </div>
                </div>

                <div className="mt-4 ">
                    <p className="text-yellow-100 text-xl font-bold">Rs {course?.price}</p>
                    <div className='flex flex-row gap-3 items-center mt-2'>
                        <button 
                            className="bg-richblack-800 flex items-center justify-center gap-2 cursor-pointer text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold  hover:shadow-none hover:scale-95 transition-all duration-200 text-red-700"
                            onClick={removeHandler}
                        >
                            <MdDelete />
                            <span>Remove</span>
                        </button>
                        <button 
                            className={`flex items-center justify-center gap-2 cursor-pointer text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold hover:shadow-none hover:scale-95 transition-all duration-200 bg-yellow-50 text-black`}
                            onClick={addHandler}
                        >
                            { matchRoute("/dashboard/bookmarked-courses") ? (<span>Add to Cart</span>) : (<span>Save for later</span>) }
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CourseComponent
