import { NavLink } from "react-router-dom";
import { useState } from "react";
import { CalendarDays, InboxIcon } from "lucide-react";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const workspaces = ["Dtask", "Nexus", "Everstudio"];

  return (
    <div className="w-64 h-screen bg-white/70 backdrop-blur-md border-r px-4 py-5 flex flex-col">
      {/* Header */}

      {/* Profile */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          R
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">Raju</p>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex flex-col space-y-2 mb-6">
        <NavLink
          to="/inbox"
         onClick={() =>  setOpenMenu("inbox")}
          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
            openMenu === "inbox" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-2 text-sm">
           <InboxIcon size={16} />
            Inbox
           </div>
         <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
            20
          </span>
        </NavLink>

        <NavLink
          to="/today"
       onClick={() => setOpenMenu("today")}
          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
            openMenu === "today" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
           <div className="flex items-center gap-2 text-sm">
            <CalendarDays size={16} />
            Today
          </div>
           <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
            4
          </span>
        </NavLink>
      </nav>

      {/* Workspaces */}
      <div>
        <h3 className="text-xs uppercase text-gray-400 mb-3 tracking-wide">
          Workspaces
        </h3>

        <div className="space-y-2">
          {workspaces.map((ws) => (
            <div
              key={ws}
              className="relative flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition"
            >
             <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                {ws}
              </div>

              <button
                onClick={() =>
                  setOpenMenu(openMenu === ws ? null : ws)
                }
                className="text-gray-500 hover:text-gray-800"
              >
                ⋮
              </button>

              {/* Dropdown */}
              {openMenu === ws && (
                <div className="absolute right-0 top-10 w-32 bg-white border rounded-lg shadow-lg p-2 z-10">
                  <p className="cursor-pointer px-3 py-1 rounded hover:bg-gray-100 text-sm">
                    Edit
                  </p>
                  <p className="cursor-pointer px-3 py-1 rounded hover:bg-red-100 text-sm text-red-500">
                    Delete
                  </p>
                  <button
                    onClick={() => setOpenMenu(null)}
                    className="mt-1 text-xs text-gray-500 w-full text-center"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;