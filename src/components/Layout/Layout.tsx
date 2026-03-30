import { Outlet } from "react-router-dom";


import Header from "../header/Header";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar></Sidebar>

      {/* Right Side */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <Header></Header>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Main;