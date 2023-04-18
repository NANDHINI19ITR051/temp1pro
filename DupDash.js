// import { dataDigitalBestSeller } from './data';
// import React from "react";
import React, { Component } from "react";
// import Slider from "react-slick";

import "../dash.css";
import Sidebar from "../Sidebar";
import logo from "../assests/logo.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { BACKEND_URI } from "../config/constants";
import { GrFavorite } from "react-icons/gr";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineFavorite } from "react-icons/md";
// import Sidebar from "./Sidebar";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import ReactPlayer from "react-player";
import { SliderData } from './SliderData';
import ReactTooltip from "react-tooltip";
import 'react-multi-carousel/lib/styles.css';
import Carousel from "react-multi-carousel";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { dataDigitalBestSeller } from './data';


function DupDash() {
  const [medias, setMedias] = useState([]);
  //   const [select] = useState("");
  const [select, setSelect] = useState("");
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [videos, setVideos] = useState([]);
  const [isClick, setclick] = useState("false");
  const [current, setCurrent] = useState(0);
    const [isHovered,setIsHovered]=useState(false);
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 3000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [defaultImage, setDefaultImage] = useState({});
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: "block", backgroundColor: "green" }}
        onClick={onClick}
      />
    );
  }
  
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{  display: "block", backgroundColor: "red" }}
      onClick={onClick}
    />
  );
}
const settings1 = {
  
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        // dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
  const settings = {
    dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      cssEase: "linear",
      pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      //linkDefault: imgGirl,
    }));
  };


  useEffect(() => {
    getAllMedias();

    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [current]);
  
  const length = 4;
  function auto() {
    slideInterval = setInterval(goToNext, intervalTime);
  }
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };   
  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  //color:"black"
  };

  const c = async(id) => {
    setclick((isClick) => !isClick);
    
    
    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }

    formdata.append("id", id);
    formdata.append("name", name);
    formdata.append("category", category);

      if (window.confirm('Do you want to get?')) {
        await axios.get(`${BACKEND_URI}/api/v1/media/video`).then((res) => {
          alert('got successfully.')
          setMedias(res.data)
          console.log("inserted to favorates")
        }).catch((err) => {
          console.log("error in @ "+err.message)
        })
      }
  };

  const savehistory=()=>{
    axios.post().then().catch()
  }
const hello=()=>{
//     target="_blank"
}
const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide}
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button onClick={() => onClick()} />;
};
  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
        const l=4;
        console.log(l);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <div><Sidebar>
    <div className="box" >
      <p className="p">
       <div> <b>Dashboard</b></div><div>
        <input
          type="search"
          placeholder="Category.."
          value={select}
        //   onChange={(e) => setSelect(e.target.value)}
        /></div>
      </p>
      <div>
    <Slider className="Slider"{...settings} >
      
    {medias &&medias.map((item) => (
          <div className="card" >
            <div className="card-top" >
            
            {item.videos.map((video) => {
              return(
            <ReactPlayer url={
              `${BACKEND_URI}${video}`
                } controls="true" style={{width:"50%"}}  target="_blank" data-tip="ur des" className="des"></ReactPlayer>); })}
              
            </div>
            <div className="card-bottom">
              <span className="category">Topic :{item.name}</span>
            <span>Category :{item.category}</span>

            </div>
          </div>
        ))}
        
      </Slider>
    </div>
      {/* <table className="table" >
        <tbody style={{ marginLeft: "3em" }}>
          {medias &&
            medias
              .filter((media) => {
                return select.toLowerCase() === ""
                  ? media
                  : media.category.toLowerCase().includes(select);
              })
              .map((media) => {
                return (
                  <tr className="tr">
                    <td>
                      <div>
                        <h1>{media.name}</h1>
                        {media.videos.map((video) => {
                          return (
                            <video
                              preload="auto"
                              width="320"
                              height="240"
                              controls
                            >
                              <source src={`${BACKEND_URI}${video}`} />
                              ;Your browser does not support the video tag.
                            </video>
                          );     
                        })}
                      </div>
                      <div className="flex-container">
                        <div
                          className="icons"
                          style={{
                            display: "flex",
                            width: "2em",
                            marginTop: "1em",
                          }}
                        >
                          <p
                            style={{ marginLeft: "1em" }}
                            onClick={c}
                            // style={{
                            //   backgroundColor: isClick ? "red" : "white",
                            // }}
                          >
                            <GrFavorite />
                          </p>
                          <p style={{ marginLeft: "15em" }}>
                            <BsBookmark />
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table> */}
       {/* <section className='slid'>
      <FaArrowAltCircleLeft id='left-arrow' onClick={prevSlide}  />
      <FaArrowAltCircleRight id='right-arrow' onClick={nextSlide} />
      {SliderData.map((slide, sindex) => {
        return (
          <div
            className={sindex === current ? 'slide active' : 'slide'}
            key={sindex}>
            {sindex === current && (
       <ReactPlayer url={slide.image}></ReactPlayer>
            )}
          </div>  
        );  })}
        
    </section> */}
    <br></br>
<br></br><br></br>    <div className="App1">
    <Slider className="Slider" {...settings1} >
        {dataDigitalBestSeller.map((item) => (
          <div className="card1">
            <div className="card1-top" style={{fontSize:"50px"}}>"</div>
            <div className="card1-bottom">
           
              <h1>{item.title}</h1>
            </div>
           
          </div>
        ))}
  
  </Slider>
    </div>
    </div>
    
    </Sidebar>
    
    </div>
  );
}

export default DupDash;
