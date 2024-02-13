/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Autoplay, Pagination } from "swiper";
import axios from "axios";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import testimonialData from "../data/testimonial.json";
import "./cusTestimonial.css";

const ReviewStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
      &#9733;
    </span>
  ));

  return <div className="review-stars">{stars}</div>;
};

const Testimonial = ({ isBg, reviewData }) => {
  console.log(reviewData);
  const { testimonial } = testimonialData;

  return (
    // <!-- ========== Testimonial section start ========== -->
    <section
      id="reviews"
      className={`section-padding testimonial ${
        isBg === "yes" ? "bg-one" : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
            <div className="section-title-center text-center">
              <span>{testimonial.subtitle}</span>
              <h2 className="display-6">{testimonial.title}</h2>
              <div className="section-divider divider-traingle"></div>
            </div>
          </div>
        </div>
        <div className="row testi-row">
          <div className="col-12">
            <Swiper
              id="Testimonial-cusSwiper"
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {reviewData &&
                reviewData.length > 0 &&
                reviewData.map((data) => (
                  <SwiperSlide key={data.id}>
                    <div className="swiper-slide p-5px-lr">
                      <div className="testi-card card h-100 translateEffect1">
                        <div className="card-body p-4 d-flex flex-column justify-content-between">
                          <div className="testi-card__quotation">
                            <i className="icofont-quote-right"></i>
                          </div>
                          <div className="testi-card__user-info pt-4  text-left">
                            <div className="testimonial__user-info__content text-left">
                              <ReviewStars rating={data.rating} />
                              <h3
                                style={{ fontSize: "1rem" }}
                                className="mb-0"
                              >
                                {data.name}
                              </h3>
                              <p className="mb-0">{data.profession}</p>
                            </div>
                          </div>
                          <p className="my-4" style={{ height: "200px" }}>{data.reviewText}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
    // <!-- ========== Testimonial section end ========== -->
  );
};

export default Testimonial;
