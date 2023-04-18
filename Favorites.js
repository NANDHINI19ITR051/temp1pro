import React from 'react'
// import React from 'react'
import logo from '../assests/logo.jpeg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { BACKEND_URI } from "../config/constants";
import Sidebar from "../Sidebar";

const Favorites = () => {


  const [medias, setMedias] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };

  const deleteUser = async (id) => {

    if (window.confirm('Do you want to remove?')) {
      await axios.delete(`${BACKEND_URI}/api/v1/media/${id}`).then((res) => {
        alert('Removed successfully.')
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }
  return (
  
    <div style={{ width: "80%", backgroundColor: "white", height: "100%", float: "left", overflowY: "auto" }} >
      <div style={{ width: "100%", backgroundColor: "grey", height: "4em", float: "left" }}><h2 style={{ textAlign: "center", color: "white", marginTop: "0.3em" }}>Videos List!</h2></div>
      <div className='videoList'>
        <table>
          <thead>
            <tr>
              <th>VideoId</th>
              <th>VideoName</th>
              <th><input type="search" placeholder="Category.." value={select} onChange={(e) => setSelect(e.target.value)} style={{ width: "6em", height: "2em", border: "1px solid white", borderRadius: "10px" }} /></th>
              <th>Video</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {medias &&
              medias.filter((media) => {
                return select.toLowerCase() === '' ? media : media.category.toLowerCase().includes(select);
              })
                .map((media) => {
                  return (
                    <tr>
                      <td>{media.id}</td>
                      <td>{media.name}</td>
                      <td>{media.category}</td>
                      <td className='video'>
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
                      </td>
                      <td><FaTrash className='icon' onClick={(e) => deleteUser(media._id)} /></td>
                    </tr>
                  );
                })}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Favorites
