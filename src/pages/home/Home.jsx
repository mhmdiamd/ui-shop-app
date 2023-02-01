import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';
import './my-swiper.css';

import newestPhoto1 from '../../assets/img/newest/photo1.png';

// import required modules
import { Pagination, Navigation } from 'swiper';
import { Layout } from '../../components/Layout/Main';
import { SectionContent } from './../../components/SectionContent/SectionContent';
import { CardProduct } from './../../components/CardProduct/CardProduct';
import useFetch from '../../common/useFetch';
import { useState } from 'react';

export const Home = () => {
  const { data, error, loading } = useFetch(`${process.env.REACT_APP_ENDPOINT}/products`);
  const [searchData, setSearchData] = useState([]);
  const products = data.data;
  return (
    <>
      <Layout searchData={setSearchData}>
        <div className="container ">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              765: {
                grabCursor: true,
                slidesPerView: 2.758,
                spaceBetween: 30,
                slidesPerGroup: 3,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiperNewest my-4"
          >
            <SwiperSlide>
              <img className="img-fluid" src={newestPhoto1} alt="" />
              <span className="fs-2 text-light fw-bold position-absolute">Black Edition</span>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>

        <div className="container pb-5">
          <SectionContent title={'Category'} description={'What are you currently looking for'}>
            <Swiper
              slidesPerView={3}
              spaceBetween={15}
              slidesPerGroup={3}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                765: {
                  grabCursor: true,
                  slidesPerView: 4,
                  spaceBetween: 30,
                  slidesPerGroup: 4,
                },

                990: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                  slidesPerGroup: 5,
                },
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiperCategories container"
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
          </SectionContent>

          <SectionContent title={'New'} description="You’ve never seen it before!">
            {searchData.data ? searchData.data.map((product) => <CardProduct data={product}></CardProduct>) : products?.map((product) => <CardProduct data={product}></CardProduct>)}
          </SectionContent>

          <SectionContent title={'Popular'} description="Find clothes that are trending recently">
            <CardProduct data={{ id: 1, product_name: 'Baju Muslim', price: 2000, store_name: 'Zalora cloth', photo: newestPhoto1 }}></CardProduct>

            <CardProduct data={{ id: 1, product_name: 'Baju Muslim', price: 2000, store_name: 'Zalora cloth', photo: newestPhoto1 }}></CardProduct>

            <CardProduct data={{ id: 1, product_name: 'Baju Muslim', price: 2000, store_name: 'Zalora cloth', photo: newestPhoto1 }}></CardProduct>

            <CardProduct data={{ id: 1, product_name: 'Baju Muslim', price: 2000, store_name: 'Zalora cloth', photo: newestPhoto1 }}></CardProduct>

            <CardProduct data={{ id: 1, product_name: 'Baju Muslim', price: 2000, store_name: 'Zalora cloth', photo: newestPhoto1 }}></CardProduct>

            <CardProduct data={{ id: 1, product_name: 'Baju Muslim', price: 2000, store_name: 'Zalora cloth', photo: newestPhoto1 }}></CardProduct>

            <CardProduct data={{ id: 1, product_name: 'Baju Muslim', price: 2000, store_name: 'Zalora cloth', photo: newestPhoto1 }}></CardProduct>
          </SectionContent>
        </div>
      </Layout>
    </>
  );
};
