import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/Layout/Sidebar";

const Main = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Main;
