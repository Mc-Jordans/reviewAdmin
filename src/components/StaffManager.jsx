import { useState } from "react";
import { Plus } from "lucide-react";

function StaffManager() {
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
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Manage Staff
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Add staff and assign them to departments.
      </p>
      <form
        onSubmit={handleAddStaff}
        className="mb-6 flex flex-col sm:flex-row gap-4"
      >
        <input
          type="text"
          value={newStaffName}
          onChange={(e) => setNewStaffName(e.target.value)}
          placeholder="Enter staff name"
          className="w-full sm:w-64 border border-gray-300 rounded-md p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <select
          value={newStaffDepartment}
          onChange={(e) => setNewStaffDepartment(e.target.value)}
          className="w-full sm:w-64 border border-gray-300 rounded-md p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Staff
        </button>
      </form>
      <div className="space-y-4">
        {staffs.map((staff) => (
          <div
            key={staff.id}
            className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {staff.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
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
