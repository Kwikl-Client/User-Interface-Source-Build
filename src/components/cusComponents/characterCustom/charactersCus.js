import React, { useRef } from "react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // Include effect-fade styles
import "./charactersCus.css";
import { Swiper, SwiperSlide } from "swiper/react";
import charactersData from "../../../data/characters.json";

const Characters = ({ isBg, charactersDataa }) => {
  const { characters } = charactersData;
  const contentSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);

  const changeSlide = (pos) => {
    if (contentSwiperRef.current && imageSwiperRef.current) {
      if (pos === "next") {
        contentSwiperRef.current.swiper.slideNext();
        imageSwiperRef.current.swiper.slideNext();
      } else {
        contentSwiperRef.current.swiper.slidePrev();
        imageSwiperRef.current.swiper.slidePrev();
      }
    }
  };

  return (
    // <!-- ========== Character section start ========== -->
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
              <span>{characters.subtitle}</span>
              <h2 className="display-6">{characters.title}</h2>
              <div className="section-divider divider-traingle"></div>
            </div>
          </div>
        </div>
        <div className="row testi-row">
          <div className="cus-char-styles">
            <Swiper
              modules={[EffectFade]}
              ref={imageSwiperRef}
              className="image-container"
              effect="fade"
            >
              {charactersDataa &&
                charactersDataa.length > 0 &&
                charactersDataa.map((data) => (
                  <SwiperSlide key={data._id}>
                    <img src={data.image} alt={data.characterName} />
                  </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
              modules={[Navigation]}
              ref={contentSwiperRef}
              className="content-container"
            >
              {charactersDataa &&
                charactersDataa.length > 0 &&
                charactersDataa.map((data) => (
                  <SwiperSlide key={data._id} className="data">
                    <h4>{data.characterName}</h4>
                    <p className="m-10px-b text-muted fs-5">{data.shortDescription}</p>
                    <p className="characterData">{data.briefDescription}</p>
                    <p className="characterData">{data.briefDescription2}</p>

                  </SwiperSlide>
                ))}
              <div
                className="swiper-button-next"
                onClick={() => changeSlide("next")}
              ></div>{" "}
              {/* Next button element */}
              <div
                className="swiper-button-prev"
                onClick={() => changeSlide("prev")}
              ></div>{" "}
              {/* Previous button element */}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
    // <!-- ========== Character section end ========== -->
  );
};

export default Characters;
