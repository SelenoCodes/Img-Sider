import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import "./styles.css";
const ImgSlider = ({ url,page,limit }) => {
  // ------States--------
  const [imgs, setImgs] = useState([]);
  const [err, setErr] = useState(null);
  const [currSlide, setCurrSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  // -------Fetch Images Function-----
  const fetchImages = async (url) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      if (data) {
        setImgs(data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setErr(e);
    }
  };

  // -----Functionalities------

  const handleArrowClick = (prev, next) => {
    prev
      ? setCurrSlide(currSlide === 0 ? imgs.length - 1 : currSlide - 1)
      : setCurrSlide(currSlide === imgs.length - 1 ? 0 : currSlide + 1);
  };

  // ----UseEffect------
  useEffect(() => {
    if (url !== null) {
      fetchImages(`${url}?page=${page}&limit=${limit}`);
    }
  }, [url]);

  return (
    <>
      <div className="container">
        {imgs && imgs.length
          ? imgs.map((img, index) => (
              <img
                key={index}
                src={img.download_url}
                alt={img.download_url}
                className={
                  currSlide === index ? "current-img" : "current-img hide-img"
                }
              />
            ))
          : null}
        <div className="loading-text">
          {loading ? <p>Fetching Images, Please wait!</p> : null}
        </div>
        <div className="error-text">
          {err ? <p>Error Encountered!</p> : null}
        </div>
        <div className="arrow-buttons">
          <FaArrowAltCircleLeft
            onClick={() => handleArrowClick("prev")}
            className="arrow"
          />
          <FaArrowAltCircleRight
            onClick={() => handleArrowClick("next")}
            className="arrow"
          />
        </div>
        <div className="cricle-indicators">
          {imgs && imgs.length
            ? imgs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrSlide(index)}
                  className={
                    currSlide === index
                      ? "current-indicator"
                      : "current-indicator deactive-indicator"
                  }
                ></button>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default ImgSlider;
