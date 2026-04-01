import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/Layout/Sidebar";

const Main = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="flex-1 bg-gray-100 min-h-screen p-6"></div>
            <Outlet />
    
        </div>
    );
};

export default Main