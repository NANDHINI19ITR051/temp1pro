import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUpload
}from "react-icons/fa";
import { FiLogOut} from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import '../App.css';

const Sidebar1 = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/list",
            name:"VideoList",
            icon:<FaTh/>
        },
        {
            path:"/upload",
            name:"Upload",
            icon:<FaUpload/>
        },
        {
            path:"/LogOut",
            name:"LogOut",
            icon:<FiLogOut />
        }
    ]
    return (
    <div>
        <div className='header'>
          <img  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjPovL5NEmIg61U0u6-Z-jm-m_VjU1LlB24w&usqp=CAU' alt="ARI LOGO" style={{width:"100px",height:"50px",margin:"1.5em 0 0 2em"}}/>
          <h1 style={{marginLeft:"10em", marginTop:"-1.7em",color:"chocolate"}}> ARI Tutorial</h1>
          <div className="top_section" >
                   {/* <h1 style={{ color:"white",display: isOpen ? "block" : "none"}} className="logo"></h1> */}
                   <div style={{marginLeft: isOpen ? "0" : "0",position:"fixed"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
        </div>
     
        <div className="container" style={{position:"fixed",marginTop:"6em"}}>
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
           
               
              
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link " activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
        </div>
    );
};

export default Sidebar1;