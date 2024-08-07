import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import Course_Card from './Course_Card';

const CourseSlider = ({ courses }) => {
    return (
        <div>
            {
                courses?.length ?
                    (
                        <Swiper
                            modules={[Scrollbar, A11y, Pagination, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={true}
                            breakpoints={{
                                1024: {
                                  slidesPerView: 3,
                                },
                            }}
                            loop={true}
                            autoplay={true}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            className="max-h-[30rem]"
                        >
                            {
                                courses?.map((course, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <Course_Card course={course} Height={"250px"} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    )
                    :
                    (
                        <p className="text-xl text-richblack-5">No course found</p>
                    )
            }

        </div>
    )
}

export default CourseSlider