import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

       
        <Navbar />

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;