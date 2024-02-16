/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import data from "../data/author.json";
import CustomModal from "./cusComponents/modal/modal";
import "./authorv.css";

const Authorv3 = ({ isBg, authorData,heroData = {} }) => {
  const { authorv3 } = data;
  const navigate = useNavigate();
  const handleLinkClick = (link) => {
    navigate(link)
  }

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleCloseModal = () => {
    setName("");
    setEmail("");
    setShowModal(false);
  }
  const updateFormData = async (formData) => {
    try {
      const formDataResponse = await axios.post("http://18.207.152.156:7000/content/formData", formData);
      return formDataResponse.data;
    } catch (error) {
      console.error("Error updating form data:", error);
      throw error;
    }
  };
  





  return (
    <section id="author3" className={`section-padding authorv3 ${isBg === "yes" ? "bg-one" : ""}`}>
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="author-image">
              <img className="img-fluid" src={authorData?.image} alt={authorData?.name} style={{width:'700px'}}/>
              <button  className="glightbox3 btn__secondary" onClick={() => setShowModal(true)}>Get Strong Now!</button>

            </div>
          </div>
          <div
            className="col-lg-6"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="authorv3__content">
              <div className="authorv3__content--badge">
                {authorv3.subtitle}
              </div>
              <h3 className="display-5 mb-0">{authorData?.name}</h3>
              <p className="m-30px-b text-muted fs-5">{authorData?.shortDescription}</p>
              <p className="m-30px-b">{authorData?.briefDescription}</p>

              <ul className="social-icon mt-0 mb-0">
                {authorv3.social?.map((data, i) => (
                  <li key={i}>
                    {data.link === "" ? (
                      ""
                    ) : (
                      <a href={data.link}>
                        <img
                          className="img-fluid"
                          src={data.icon}
                          alt="icon"
                          width="25"
                          height="25"
                        />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLinkClick={handleLinkClick}
        heroData={heroData}
      />
    </section>
  );
};

export default Authorv3;
