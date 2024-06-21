import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './index.css';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

function SwiperSchool() {
  return (
    <div className='swiper_containerx'>
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
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className='swiper_container'
      >
        <SwiperSlide>
          <div className='slide-content'>
            <img
              src='https://cdn.pixabay.com/photo/2019/04/06/06/44/astronaut-4106766_1280.jpg'
              alt='slide_image'
            />
            <h2 className='slide-text'>School of ......</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slide-content'>
            <img
              src='https://media.istockphoto.com/id/1478451948/vector/space-poster.jpg?s=1024x1024&w=is&k=20&c=e_8gS1yQUf6-txO3iwlhEPNtmklLpvxKJzXCD-X7XLE='
              alt='slide_image'
            />
            <h2 className='slide-text'>School of ......</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slide-content'>
            <img
              src='https://cdn.pixabay.com/photo/2015/07/31/11/45/library-869061_1280.jpg'
              alt='slide_image'
            />
            <h2 className='slide-text'>School of ......</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slide-content'>
            <img
              src='https://cdn.pixabay.com/photo/2017/07/15/22/07/library-2507902_960_720.jpg'
              alt='slide_image'
            />
            <h2 className='slide-text'>School of ......</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slide-content'>
            <img
              src='https://cdn.pixabay.com/photo/2019/04/06/06/44/astronaut-4106766_1280.jpg'
              alt='slide_image'
            />
            <h2 className='slide-text'>School of ......</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slide-content'>
            <img
              src='https://cdn.pixabay.com/photo/2019/10/17/09/18/cartoon-4556429_1280.png'
              alt='slide_image'
            />
            <h2 className='slide-text'>School of ......</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slide-content'>
            <img
              src='https://cdn.pixabay.com/photo/2011/12/13/14/30/earth-11014_1280.jpg'
              alt='slide_image'
            />
            <h2 className='slide-text'>School of ......</h2>
          </div>
        </SwiperSlide>

        <div className='slider-controler'>
          <div className='swiper-button-prev slider-arrow'>
            <ion-icon name='arrow-back-outline'></ion-icon>
          </div>
          <div className='swiper-button-next slider-arrow'>
            <ion-icon name='arrow-forward-outline'></ion-icon>
          </div>
          <div className='swiper-pagination'></div>
        </div>
      </Swiper>
    </div>
  );
}

export default SwiperSchool;
