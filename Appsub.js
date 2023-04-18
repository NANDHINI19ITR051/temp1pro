import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Sidebar from './Sidebar'
import Dashboard1 from "./User/Dashboard";
import Favorites from "./User/Favorites";
import History from "./User/History";
import Wishlist from "./User/Wishlist";
import UploadVideos from "./Admin/UploadVideos";
import VideoList from "./Admin/VideoList";
// import DashBoard from "./Admin/DashBoard";

const Appsub = () => {
  return (
    <div>
      <Sidebar>
        <Routes>
          {/* <Route path="/" element={<DashBoard/>}/> */}
          <Route path="/upload" element={<UploadVideos/>}/>
          <Route path="/list" element={<VideoList/>}/>
          <Route path="/dashboard" element={<Dashboard1/>}/>
          <Route path="/fav" element={<Favorites/>}/>
          <Route path="/his" element={<History/>}/>
          <Route path="/wish" element={<Wishlist/>}/>
          </Routes>
          </Sidebar>
    </div>
  )
}

export default Appsub
