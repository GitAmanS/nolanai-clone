import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-10 bg-[#DDE0EB] border-r-2 border-white text-white flex flex-col items-center py-4">
        <div className="text-xl font-bold">UP</div>
      </div>

      <div className="flex-1 p-6">
 
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Start new project</button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="p-4 bg-gray-200 rounded">
              <h3 className="font-semibold">Untitled Project</h3>
              <p className="text-sm text-gray-600">Last edited 11 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
