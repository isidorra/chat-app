import Navbar from "./Navbar"
import {Outlet} from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="h-screen">
//       <Navbar/>
//       <Outlet/>
//     </div>
//   )
// }

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};



export default Layout