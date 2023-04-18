import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../App.css';
import Sidebar1 from './Sidebar1';
import { BACKEND_URI } from "../config/constants";
const UploadVideos = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [videos, setVideos] = useState([]);
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.includes('video/')) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2 && file.size <= 5000000) {
                    setVideos(e.target.files);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please select a video file with a size less than 10MB.'
                      }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.reload();
                        }
                      })
                }
            };
            reader.readAsDataURL(file);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a video file.'
              }).then((result)=>{
                if(result.isConfirmed){
                    window.location.reload();
                }
              })
        }
    }
    const hadleSubmit = (e) => {
        e.preventDefault();
        let formdata = new FormData();
        for (let key in videos) {
            formdata.append("videos", videos[key]);
        }
        formdata.append("name", name);
        formdata.append("category", category);

        axios
            .post(`${BACKEND_URI}/api/v1/media/create`, formdata)
            .then((success) => {
                Swal.fire("Submitted successfully")
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error Happened!");
            });
        window.location.reload();
    };
    return (
        <div><Sidebar1>
        <div className='MainClass'>
      <div className='MainHeader'>
                <p><b>Upload Videos</b></p>
            </div>
            <div className='cdiv'>
                <div className='InputForm'>
                    <form onSubmit={hadleSubmit}>
                        <input className='input0' type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="Video_Name" autoComplete='off' required />
                        <br/>
                        <select className='input12' onChange={(e) => setCategory(e.target.value)} required>
                            <option value='Category' hidden selected>Category</option>
                            <option style={{height:'1em',fontSize:"20px",color:"chocolate"}} value='java'>Java</option>
                            <option style={{height:'1em',fontSize:"20px",color:"chocolate"}} value='Python'>Python</option>
                            <option style={{height:'1em',fontSize:"20px",color:"chocolate"}} value='ReactJs'>ReactJs</option>
                        </select>
                        <br/>
                        <input className='input13' id='file-upload' type="file" name="videos" single accept=".mp4,.mkv" onChange={handleChange} placeholder="Video" autocomplete="off" required />
                        <br />
                        <button type='submit' className='submit1'>Submit</button>
                    </form>
                </div>
                
            </div>
        </div>
        </Sidebar1>
        </div>
            )
}

export default UploadVideos