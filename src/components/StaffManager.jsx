import { useState } from "react";
import { Plus } from "lucide-react";

function StaffManager({ isDarkMode }) {
  const [departments] = useState([
    { id: "admin", name: "Administration" },
    { id: "finance", name: "Finance Department" },
    { id: "academic", name: "Academic Affairs" },
    { id: "library", name: "Library" },
    { id: "it", name: "IT Services" },
  ]);
  const [staffs, setStaffs] = useState([]);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffDepartment, setNewStaffDepartment] = useState("");

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (newStaffName.trim() && newStaffDepartment) {
      setStaffs([
        ...staffs,
        {
          id: Date.now().toString(),
          name: newStaffName,
          department: newStaffDepartment,
        },
      ]);
      setNewStaffName("");
      setNewStaffDepartment("");
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-950" : "bg-white"
      } rounded-lg shadow-md p-4 sm:p-6`}
    >
      <h3
        className={`text-lg font-semibold ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Manage Staff
      </h3>
      <p
        className={`text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        } mb-6`}
      >
        Add staff and assign them to departments.
      </p>
      <form onSubmit={handleAddStaff} className="mb-6 flex flex-col gap-4">
        <input
          type="text"
          value={newStaffName}
          onChange={(e) => setNewStaffName(e.target.value)}
          placeholder="Enter staff name"
          className={`w-full border ${
            isDarkMode
              ? "border-gray-700 bg-gray-800 text-white"
              : "border-gray-300 bg-white text-gray-900"
          } rounded-md p-2 text-sm`}
        />
        <select
          value={newStaffDepartment}
          onChange={(e) => setNewStaffDepartment(e.target.value)}
          className={`w-full border ${
            isDarkMode
              ? "border-gray-700 bg-gray-800 text-white"
              : "border-gray-300 bg-white text-gray-900"
          } rounded-md p-2 text-sm`}
        >
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className={`w-full ${
            isDarkMode
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded flex items-center justify-center text-sm`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Staff
        </button>
      </form>
      <div className="space-y-4">
        {staffs.map((staff) => (
          <div
            key={staff.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div>
              <p
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } truncate`}
              >
                {staff.name}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } truncate`}
              >
                {departments.find((d) => d.id === staff.department)?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffManager;
