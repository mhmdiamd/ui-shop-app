import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import style from './style.module.css';
import './my-swiper.css';

import newestPhoto1 from '../../assets/img/newest/photo1.png';
import newestPhoto2 from '../../assets/img/newest/photo2.png';
import newestPhoto3 from '../../assets/img/newest/photoNewest3.jpg';

// import required modules
import { Pagination, Navigation } from 'swiper';
import { Layout } from '../../components/Layout/Main';
import { SectionContent } from './../../components/SectionContent/SectionContent';
import { CardProduct } from './../../components/CardProduct/CardProduct';
import { Link } from 'react-router-dom';
import { useGetAllProductQuery } from '../../features/product/productApi';
import { useGetCategoriesQuery } from '../../features/category/categoryApi';
import { faGrip } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
  const { data: products, isError: isErrorLoading, isLoading: isLoadingProducts } = useGetAllProductQuery();
  const { data: categories, isError: isErrorCategories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const [searchData, setSearchData] = useState();

  return (
    <>
      <Layout searchData={setSearchData}>
        <div className="container">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            slidesPerGroup={1}
            loop={true}
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
            className={'mySwiperNewest my-4'}
          >
            <SwiperSlide>
              <img className="img-fluid" src={newestPhoto1} alt="" />
              <span className="fs-2 text-light fw-bold position-absolute">Trend in 2022</span>
            </SwiperSlide>
            <SwiperSlide>
              <img className="img-fluid" src={newestPhoto2} alt="" />
              <span className="fs-2 text-light fw-bold position-absolute">Black Edition</span>
            </SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>
              <img className="img-fluid" src={newestPhoto3} alt="" />
              <span className="fs-2 text-light fw-bold position-absolute">Black Edition</span>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="container pb-5">
          <SectionContent title={'Category'} description={'What are you currently looking for'}>
            <Swiper
              slidesPerView={3}
              spaceBetween={15}
              slidesPerGroup={3}
              loop={true}
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
              {categories?.map((category) => (
                <SwiperSlide key={category.id} style={{ backgroundColor: category.background_color }}>
                  <Link to={`/products/category/${category.id}`} className={`d-flex align-items-center justify-content-center text-center w-100 h-100`}>
                    <img className={`${style.categoryImage} img-fluid`} crossOrigin="anonymous" src={category.photo} alt={category.name} />
                    <span className="fs-3 text-light fw-bold position-absolute">{category.name}</span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </SectionContent>

          {searchData ? (
            <SectionContent title={`Search`} description="Found product what you want!">
              {searchData?.data.map((product) => (
                <CardProduct key={product.id} data={product}></CardProduct>
              ))}
            </SectionContent>
          ) : (
            <>
              <SectionContent title={'New'} moreLink={'/products/type/new?page=1'} description="You’ve never seen it before!">
                {isLoadingProducts ? 'Loading' : products?.data?.map((product) => <CardProduct key={product.id} data={product}></CardProduct>)}
              </SectionContent>

              <SectionContent title={'Popular'} moreLink={'/products/type/popular?page=1'} description="Find clothes that are trending recently">
                {isLoadingProducts ? 'Loading' : products?.data?.map((product) => <CardProduct key={product.id} data={product}></CardProduct>)}
              </SectionContent>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};
