import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import MentorCard from "./MentorCard";
import inst1 from '../../assets/images/inst1.png'
import inst2 from '../../assets/images/inst2.png'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Mentor = () => {
    return (
        <div>
             <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                speed={1000}
                className="mentor-swiper"
                >
                <SwiperSlide>
                    <MentorCard
                    image={inst1}
                    heading="Transforming Learners Into Industry Leaders."
                    description="Through real-world challenges, personalized mentorship, and a thriving community, we empower developers to ship products that matter."
                    quote="We bridge the gap between learning and doing."
                    name="Love Babbar"
                    designation="Mentor & Educator"
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <MentorCard
                    image={inst2}
                    heading="Here to Guide, not Just Create."
                    description='Courses are everywhere, what we provide is "A living ecosystem built for real builders". Here, learning becomes action, through collaboration, critique, and real world execution.'
                    quote="We bridge the gap between learning and doing."
                    name="Hitesh Choudhary"
                    designation="Mentor & Educator"
                    />
                </SwiperSlide>
                </Swiper>
        </div>
    )


}

export default Mentor;