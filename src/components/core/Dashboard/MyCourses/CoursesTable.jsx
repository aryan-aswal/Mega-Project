import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { MdOutlineTimer } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { formatDate } from "../../../../services/formatDate"
import { convertSecondsToDuration } from '../../../../utils/convertSecondsToDuration';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ConfirmationModal from '../../../common/ConfirmationModal'
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations.js/courseDetailsAPI'
import { useSelector } from 'react-redux';

const CoursesTable = ({ courses, setCourses }) => {
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    setConfirmationModal(null)
    setLoading(false)
    const result = await fetchInstructorCourses(token)
    console.log(result);
    if (result) {
      setCourses(result)
    }
  }

  return (
    <div>
      <Table className="rounded-xl border border-richblack-800 mt-10">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 text-richblack-100">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Courses</Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Duration</Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Prices</Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            courses.length === 0 ?
              (
                <Tr>
                  <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No course found</Td>
                </Tr>
              )
              :
              (
                courses?.map((course) => {
                  return (
                    <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 gap-4">
                      <Td colSpan={1} className="flex flex-1 gap-x-4 p-3">
                        <img src={course.thumbnail} className="md:h-[148px] md:w-[220px] aspect-video rounded-lg object-cover" />
                        <div className="flex flex-col gap-1 justify-between">
                          <p className="text-lg font-semibold text-richblack-5 mt-3 uppercase truncate tracking-wide">{course.courseName}</p>
                          <p>{`${course.courseDescription.slice(0, 50)}...`}</p>
                          <p className="text-[12px] text-white tracking-widest uppercase lg:text-left">Created: {formatDate(course?.createdAt || course?.updatedAt)}</p>
                          {course.status === 'Published' ? (<p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100 uppercase tracking-wider"><CiCircleCheck fontSize={"20px"} />Published</p>) : (<p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100 uppercase tracking-wider"><MdOutlineTimer fontSize={"20px"} />Drafted</p>)}
                        </div>
                      </Td>
                      <Td className="text-sm font-medium text-richblack-100 mb-1 tracking-wider uppercase">
                        {
                          course?.courseContent?.reduce((acc, sec) => {
                            console.log(course)
                            sec?.subSection?.forEach(sub => {
                              acc += parseFloat(sub?.timeDuration) || 0;
                            });
                            return convertSecondsToDuration(acc);
                          }, 0)}
                      </Td>
                      <Td>
                        {course.price}
                      </Td>

                      <Td>
                        <button
                          disabled={loading}
                          onClick={() => {
                            navigate(`/dashboard/edit-course/${course._id}`);
                          }}
                          title="Edit"
                          className="pr-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 mr- mb-"
                        >
                          <FiEdit2 size={20} />
                        </button>
                        <button
                          disabled={loading}
                          onClick={() => {
                            setConfirmationModal({
                              text1: "Do you want to delete this course?",
                              text2:
                                "All the data related to this course will be deleted",
                              btn1Text: !loading ? "Delete" : "Loading...  ",
                              btn2Text: "Cancel",
                              btn1Handler: !loading
                                ? () => handleCourseDelete(course._id)
                                : () => { },
                              btn2Handler: !loading
                                ? () => setConfirmationModal(null)
                                : () => { },
                            })
                          }}
                          title="Delete"
                          className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                        ><RiDeleteBin6Line size={20} /></button>
                      </Td>
                    </Tr>
                  )

                })
              )
          }
        </Tbody>

      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>


  )
}

export default CoursesTable