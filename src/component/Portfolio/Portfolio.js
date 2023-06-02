import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import './portfolio.css'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper';
import { useNavigate } from 'react-router-dom';

const Portfolio = ({img1,img2,img3,img4,img5,img6,img7,img8,img9,img10}) => {
    const navigate = useNavigate()
    const handlegallery = ()=>{
        navigate('/portfolio')
    }
    return (
        <section className='portfolio' id='portfolio'>
            <h2>Mon <span>Portfolio</span></h2>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true
                }}
                autoplay={true}
                pagination={{el:'.swiper-pagination',clickable:true}}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}

                className='swiper_container'
            >
                <SwiperSlide id='slide_img'>
                    <img src={img1} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img2} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img3} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img4} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img5} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img6} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img7} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img8} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img9} alt="/" />
                </SwiperSlide>
                <SwiperSlide id='slide_img'>
                    <img src={img10} alt="/" />
                </SwiperSlide>

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow"><span></span></div>
                    <div className="swiper-button-next slider-arrow"><span></span></div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
            <button className='btn' onClick={handlegallery}>Voir Plus</button>
        </section>
    );
};

export default Portfolio;