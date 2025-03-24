import { useState } from "react";
import { Plus } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

function DepartmentsManager() {
  const [departments, setDepartments] = useState([
    { id: "admin", name: "Administration" },
    { id: "finance", name: "Finance Department" },
    { id: "academic", name: "Academic Affairs" },
    { id: "library", name: "Library" },
    { id: "it", name: "IT Services" },
  ]);
  const [newDepartmentName, setNewDepartmentName] = useState("");

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDepartmentName.trim()) {
      const newId = newDepartmentName.toLowerCase().replace(/\s+/g, "-");
      setDepartments([...departments, { id: newId, name: newDepartmentName }]);
      setNewDepartmentName("");
    }
  };

  const downloadQR = (deptId) => {
    const canvas = document.getElementById(`qr-${deptId}`);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${deptId}-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Manage Departments
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Add departments and generate QR codes for feedback collection.
      </p>
      <form
        onSubmit={handleAddDepartment}
        className="mb-6 flex flex-col sm:flex-row gap-4"
      >
        <input
          type="text"
          value={newDepartmentName}
          onChange={(e) => setNewDepartmentName(e.target.value)}
          placeholder="Enter department name"
          className="w-full sm:w-64 border border-gray-300 rounded-md p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </button>
      </form>
      <div className="space-y-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border dark:border-gray-700"
          >
            <div className="mb-4 sm:mb-0">
              <p className="font-medium text-gray-900 dark:text-white">
                {dept.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <QRCodeCanvas
                id={`qr-${dept.id}`}
                value={`http://your-site.com/rating?dept=${dept.id}`}
                size={100}
                className="mb-2 sm:mb-0"
              />
              <button
                onClick={() => downloadQR(dept.id)}
                className="border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-gray-800"
              >
                Download QR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentsManager;
