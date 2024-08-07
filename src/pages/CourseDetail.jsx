import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations.js/courseDetailsAPI';
import Spinner from '../components/common/Spinner';
import Error from '../pages/Error'
import GetAvgRating from '../utils/avgRating';
import { buyCourse } from '../services/operations.js/studentFeaturesAPI';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import { formatDate } from '../services/formatDate';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
const CourseDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { courseId } = useParams();

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const [courseData, setCourseData] = useState(null);
    const [totalNumberOfLectures, setTotalNumberOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [avgRating, setAvgRating] = useState(0);
    const [active, setActive] = useState([]);

    const fetchCourseData = async () => {
        try {
            const response = await fetchCourseDetails(courseId);
            setCourseData(response);

            let lectures = 0;
            response?.data.courseContent.forEach((section) => {
                lectures += section.subSection.length || 0;
            })
            setTotalNumberOfLectures(lectures);

            const rating = GetAvgRating(response?.data?.ratingAndReviews);
            setAvgRating(rating);

        } catch (error) {
            console.log("ERROR --> ", error);
        }
    }

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return
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

    const handleActive = (id) => {
        setActive(
            active.includes(id)
                ? active.filter((item) => item !== id)
                : [...active, id]
        )
    }

    useEffect(() => {
        fetchCourseData();
    }, [courseId]);

    if (courseData != null && !courseData.success) {
        return <div><Error /></div>
    }

    return (
        courseData == null ?
            (<div className='h-[calc(100vh-3.5rem)] w-full flex items-center justify-center'><Spinner /></ div>)
            :
            (
                <>
                    <div className={`relative w-full bg-richblack-800`}>
                        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                            <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                                <div className='mt-16'>
                                    <div className='text-richblack-5 flex flex-col gap-5 text-lg'>
                                        <p className="text-4xl font-bold text-richblack-5 sm:text-[42px] tracking-wider lg:text-left text-center">{courseData?.data?.courseName}</p>
                                        <p className="text-richblack-200">{courseData?.data?.courseDescription}</p>
                                        <div className="text-md flex flex-wrap items-center gap-2 lg:justify-start justify-center">
                                            <span className="text-yellow-25">{avgRating}</span>
                                            <RatingStars Star_Size={24} Review_Count={avgRating} />
                                            <span className='text-yellow-50'>{`(${courseData?.data?.ratingAndReviews?.length || 0} reviews)`}</span>
                                            <span>{`${courseData?.data?.studentsEnrolled?.length || 0} students enrolled`}</span>
                                        </div>

                                        <div>
                                            <p>Created by {courseData?.data?.instructor?.firstName || `Anonymous`}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-5 text-lg">
                                            <p className="flex items-center gap-2">
                                                {" "}
                                                <BiInfoCircle /> Created at {formatDate(courseData?.data?.createdAt)}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                {" "}
                                                <HiOutlineGlobeAlt /> English
                                            </p>
                                        </div>

                                        <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                                            <CourseDetailsCard
                                                course={courseData?.data}
                                                setConfirmationModal={setConfirmationModal}
                                                handleBuyCourse={handleBuyCourse}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                            {/* What will you learn section */}
                            <div className="my-8 border border-richblack-600 p-8">
                                <p className="text-3xl font-semibold uppercase tracking-wider">What you'll Learn?</p>
                                <div className="mt-5">
                                    <ul style={{ listStyle: 'none', padding: 0 }} className="leading-relaxed">
                                        {courseData?.data?.whatYouWillLearn.split('\n').map((line, index) => (
                                            <li key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <span style={{ marginRight: '0.5em' }}>{index + 1}.</span>
                                                <span>{line.trim().substring(line.indexOf('.') + 1).trim()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Course Content Section */}
                            <div className="max-w-[830px] ">
                                <div className="flex flex-col gap-3">
                                    <p className="text-[28px] font-semibold uppercase tracking-wider">Course Content</p>
                                    <div className="flex flex-wrap justify-between gap-2">
                                        <div className="flex gap-2 tracking-wide">
                                            <span>
                                                {courseData?.data?.courseContent.length} {`section(s)`}
                                            </span>
                                            <span>
                                                {totalNumberOfLectures} {`lecture(s)`}
                                            </span>
                                        </div>
                                        <div>
                                            <button
                                                className="text-yellow-25"
                                                onClick={() => setActive([])}
                                            >
                                                Collapse all sections
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Details Accordion */}
                                <div className="py-4">
                                    {courseData?.data?.courseContent?.map((course, index) => (
                                        <CourseAccordionBar
                                            course={course}
                                            key={index}
                                            isActive={active}
                                            handleActive={handleActive}
                                        />
                                    ))}
                                </div>

                                {/* Author Details */}
                                <div className="mb-12 py-4">
                                    <p className="text-[28px] font-semibold">Author</p>
                                    <div className="flex items-center gap-4 py-4">
                                        <img
                                            src={
                                                courseData?.data?.instructor?.image
                                                    ? courseData?.data?.instructor?.image
                                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${courseData?.data?.instructor?.firstName || "Anonymous"} ${courseData?.data?.instructor?.lastName || "Tutor"}`
                                            }
                                            alt="Author"
                                            className="h-14 w-14 rounded-full object-cover"
                                        />
                                        <p className="text-lg">{`${courseData?.data?.instructor?.firstName || "Anonymous"} ${courseData?.data?.instructor?.lastName  || "Tutor"}`}</p>
                                    </div>
                                    <p className="text-richblack-50">
                                        {courseData?.data?.instructor?.additionalDetails?.about}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
                </>
            )
    )
}

export default CourseDetail