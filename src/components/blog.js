import React from "react";
import { FaCalendarAlt, FaCommentAlt } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import data from "../data/blog.json";

const Blog = ({ isBg }) => {
  const { blog } = data;

  return (
    // <!-- ========== Blog section start ========== -->
    <section
      id="blog"
      className={`section-padding blog ${isBg === "yes" ? "bg-one" : ""}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
            <div className="section-title-center text-center">
              <span>{blog.subtitle}</span>
              <h2 className="display-6">{blog.title}</h2>
              <div className="section-divider divider-traingle"></div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {blog.blogList.slice(0, 3).map((data, i) => (
            <div
              key={i}
              className="col-md-6 col-lg-4 mb-4 mb-lg-0"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={(i + 2) * 50}
            >
              <article className="blog__single-post h-100 translateEffect1">
                <div className="blog__single-post__image">
                  <Link to="/single-blog">
                    <img className="img-fluid" src={data.image} alt="Blog 01" />
                  </Link>
                </div>
                <div className="blog__single-post__body">
                  <div className="blog__single-post__content">
                    <ul class="blog-metainfo">
                      <li>
                        <FaCalendarAlt />
                        <a href="/food-delivery2">{data.date}</a>
                      </li>
                      <li>
                        <FaCommentAlt /> No Comment
                      </li>
                    </ul>
                    <h2 className="fs-4">
                      <Link to="/single-blog">{data.title}</Link>
                    </h2>
                    <p className="m-0">{data.description}</p>
                  </div>
                  <div className="blog__single-post__meta">
                    <div class="blog__single-post__meta">
                      <BiUser /> By, {data.author}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
    // <!-- ========== Blog section end ========== -->
  );
};

export default Blog;
