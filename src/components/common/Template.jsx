import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CourseComponent from './CourseComponent';
import { matchPath, useNavigate } from 'react-router-dom';
import { resetWishlist } from '../../slices/WishlistSlice';
import { addToCart } from '../../slices/cartSlice';
import { buyCourse } from '../../services/operations.js/studentFeaturesAPI';

const Template = ({ pageName }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const list = useSelector(state => {
        if (pageName === 'Wishlist') {
            return state.wishlist.wishlist;
        } else {
            return state.cart.cart;
        }
    });

    const totalCourse = useSelector(state => {
        if (pageName === 'Wishlist') {
            return state.wishlist.wishlistTotalCourse;
        } else {
            return state.cart.cartTotalCourse;
        }
    });

    const totalAmount = useSelector(state => {
        if (pageName === 'Wishlist') {
            return state.wishlist.wishlistTotalAmount;
        } else {
            return state.cart.cartTotalAmount;
        }
    });

    const clickHandler = () => {
        if (pageName === 'Wishlist') {
            list.forEach((courseId) => {
                dispatch(addToCart(courseId))
            });
            dispatch(resetWishlist());
        } else {
            const courses = cart.map((c) => c._id);
            console.log(courses);
            buyCourse(token, courses , user, navigate, dispatch);
        }
    }
    
    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h1 className='mb-8 text-3xl font-medium text-richblack-5'>Your {pageName}</h1>
            <p className='text-richblack-400 font-semibold border-b border-richblack-400 mb-4 pb-2'>{totalCourse} Courses in {pageName}</p>
            
            <div className='flex'>
                <div className='w-2/3'>
                    {
                        list.map((course, index) => (
                            <div key={course._id || index} className='flex items-center justify-between my-4 border-b border-richblack-400 pb-4'>
                                <CourseComponent courseId={course} />
                            </div>
                        ))
                    }
                </div>

                <div className='w-1/3 bg-richblack-800 border-richblue-500 border p-4 rounded-lg ml-8 h-48 flex flex-col justify-between'>
                    <div>
                        <p className='text-lg font-semibold text-gray-400'>Total Amount:</p>
                        <p className='text-2xl font-bold text-yellow-100'>Rs {totalAmount}</p>
                    </div>
                    <button 
                        className='bg-yellow-50 text-richblack-900 flex items-center justify-center gap-2 cursor-pointer text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold hover:shadow-none hover:scale-95 transition-all duration-200'
                        onClick={clickHandler}
                    >
                    { matchRoute("/dashboard/bookmarked-courses") ? (<span>Add All To Cart</span>) : (<span>Buy Now</span>) }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Template
