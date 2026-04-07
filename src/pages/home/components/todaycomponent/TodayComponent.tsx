import React, { useState } from "react";

// Task Type
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const TodayComponent: React.FC = () => {
    // State for tasks (replace with API later)
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title:
                "Finish the tasks presentation for the client meeting at 2:00 PM",
            completed: false,
        },
        {
            id: 2,
            title: "Send follow-up emails to potential leads",
            completed: false,
        },
        {
            id: 3,
            title: "Review and approve the marketing budget for Q4",
            completed: true,
        },
    ]);

    const [newTask, setNewTask] = useState<string>("");

    // Toggle Task
    const toggleTask = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Add Task
    const addTask = () => {
        if (!newTask.trim()) return;

        const newItem: Task = {
            id: Date.now(),
            title: newTask,
            completed: false,
        };

        setTasks((prev) => [...prev, newItem]);
        setNewTask("");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-5">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        Good Morning, Raju
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base mt-1">
                        It’s Monday, 29 March 2026
                    </p>
                </div>

                {/* Add Task Section */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    <input
                        type="text"
                        placeholder="Add new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Add
                    </button>
                </div>

                {/* Today Header */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-pink-500 text-lg">📅</span>
                    <h2 className="text-lg font-medium text-gray-700">Today</h2>
                    <span className="bg-gray-200 text-gray-600 text-xs sm:text-sm px-2 py-0.5 rounded-full">
                        {tasks.length.toString().padStart(2, "0")}
                    </span>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-50 p-3 rounded-lg ${task.completed ? "opacity-60" : ""
                                }`}
                        >
                            <div className="flex items-start sm:items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    className="mt-1 sm:mt-0"
                                />
                                <p
                                    className={`text-sm sm:text-base ${task.completed
                                        ? "text-gray-500 line-through"
                                        : "text-gray-700"
                                        }`}
                                >
                                    {task.title}
                                </p>
                            </div>

                            <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-md self-start sm:self-auto">
                                today
                            </span>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {tasks.length === 0 && (
                    <p className="text-center text-gray-400 mt-6">
                        No tasks available
                    </p>
                )}
            </div>
        </div>
    );
};

export default TodayComponent;