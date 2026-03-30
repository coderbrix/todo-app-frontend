import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const workspaces = ["Dtask", "Nexus", "Everstudio"];

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-bold mb-6">Raju</h2>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink
          to="/inbox"
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-500" : ""
          }
        >
          📥 Inbox
        </NavLink>

        <br />

        <NavLink
          to="/today"
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-500" : ""
          }
        >
          📅 Today
        </NavLink>
      </nav>

      {/* Workspaces */}
      <div className="mt-6">
        <h3 className="text-sm text-gray-500 mb-2">Workspaces</h3>

        {workspaces.map((ws) => (
          <div
            key={ws}
            className="flex justify-between items-center py-1"
          >
            <span>📁 {ws}</span>

            <button onClick={() => setOpenMenu(ws)}>⋮</button>

            {/* Modal */}
            {openMenu === ws && (
              <div className="absolute bg-white border shadow p-2 right-4">
                <p className="cursor-pointer hover:bg-gray-100 px-2">
                  Edit
                </p>
                <p className="cursor-pointer hover:bg-gray-100 px-2 text-red-500">
                  Delete
                </p>
                <button
                  className="text-xs mt-2"
                  onClick={() => setOpenMenu(null)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;