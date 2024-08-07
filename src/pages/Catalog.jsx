import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector'
import { getCatalogPageData } from '../services/operations.js/pageAndComponntDatas'
import { categories } from '../services/api'
import Course_Card from '../components/core/Catalog/Course_Card'

const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogData, setCatalogData] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [active, setActive] = useState(1)

    const getCategories = async () => {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        const id = result?.data?.categories.filter((ct) => { return ct.name.toLowerCase() == catalogName.toLowerCase() })[0]._id;
        setCategoryId(id);
    }
    const getCategoryDetails = async () => {
        const result = await getCatalogPageData(categoryId);
        setCatalogData(result);
    }

    useEffect(() => {
        getCategories();
    }, [catalogName])

    useEffect(() => {
        getCategoryDetails();
    }, [categoryId])


    return (
        <div>
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-25">
                            {`${catalogName[0].toUpperCase() + catalogName.substring(1, catalogName.length).split("-").join(" ")}`}
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">{`${catalogName.split("-").join(" ").toUpperCase()}`}</p>
                    <p className="max-w-[870px] text-richblack-200">{catalogData?.data?.selectedCategory.description}</p>
                </div>
            </div>

            <div>
                {/* section 1 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">Courses to get started</div>

                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                        <p
                            className={`px-4 py-2 ${active === 1
                                ? "border-b border-b-yellow-25 text-yellow-25"
                                : "text-richblack-50"
                                } cursor-pointer`}
                            onClick={() => setActive(1)}
                        >
                            Most Populer
                        </p>
                        <p
                            className={`px-4 py-2 ${active === 2
                                ? "border-b border-b-yellow-25 text-yellow-25"
                                : "text-richblack-50"
                                } cursor-pointer`}
                            onClick={() => setActive(2)}
                        >
                            New
                        </p>
                    </div>

                    <div>
                        <CourseSlider courses={catalogData?.data?.selectedCategory?.courses} />
                    </div>

                </div>



                {/* section 2 */}

                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">Top Courses in {catalogData?.data?.differentCategory?.name}</div>
                    <div className="py-8">
                        <CourseSlider courses={catalogData?.data?.differentCategory?.courses} />
                    </div>
                </div>

                {/* section 3 */}

                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <p className="section_heading">Frequently Bought</p>
                    <div className="py-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {
                                catalogData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => {
                                    return (
                                        <Course_Card key={index} course={course} Height={"400px"} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Catalog