import React from "react";
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

function Dashboard() {
  const [medias, setMedias] = useState([]);
  //   const [select] = useState("");
  const [select, setSelect] = useState("");
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [videos, setVideos] = useState([]);
  const [isClick, setclick] = useState("false");
  useEffect(() => {
    getAllMedias();
  }, []);
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
          //alert('got successfully.')
          setMedias(res.data)
          console.log("inserted to favorates")
        //  axios.put(`${BACKEND_URI}/api/v1/favor/createFav`,res.data).then((res)=>{
        //   //alert('database got')
        //  }).catch((err)=>{

        //   console.log("from got"+err.message)
        //  })
        //   window.location.reload();
        }).catch((err) => {
          console.log("error in @ "+err.message)
        })
      }
    
    // axios
    //   .post(
    //     `${BACKEND_URI}/api/v1/favor/createFav`,
    //     axios
    //       .get(`${BACKEND_URI}/api/v1/media/all`)
    //       .then((result) => {
    //         setMedias(result.data);
    //       })
    //       .catch((error) => {
    //         setMedias([]);
    //         console.log(error);
    //         //alert("Error happened!");
    //       })
    //   )
    //   .then((success) => {
    //     //alert("Submitted successfully");
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     //alert("Error happened!");
    //   });
  };

  const savehistory=()=>{
    axios.post().then().catch()
  }

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        //alert("Error happened!");
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
          onChange={(e) => setSelect(e.target.value)}
        /></div>
      </p>

      <table className="table" >
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
      </table>
    </div>
    </Sidebar>
    </div>
  );
}

export default Dashboard;
