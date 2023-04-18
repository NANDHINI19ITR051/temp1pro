import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { BACKEND_URI } from "../config/constants";
import Swal from 'sweetalert2';
import Sidebar1 from './Sidebar1';
import '../App.css';

const VideoList = () => {

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

  const deleteUser = async (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BACKEND_URI}/api/v1/media/${_id}`).then((res) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }).catch((err) => {
          console.log(err.message)
        })
      }
      window.location.reload();
    })


  }
  return (
    <div><Sidebar1>
    <div className='MainClass'>
      <div className='MainHeader'>
        <p><b>Admin DashBoard</b></p>
      </div>
      <div className='videoList1'>
        <table className='vtable'>
          <thead className='thead'>
            <tr>
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
                      <td>{media.name}</td>
                      <td>{media.category}</td>
                      <td className='video'>
                        {media.videos.map((video) => {
                          return (
                            <video
                              preload="auto"
                              width="620"
                              height="440"
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
    </div></Sidebar1>
    </div>
  )
}

export default VideoList;