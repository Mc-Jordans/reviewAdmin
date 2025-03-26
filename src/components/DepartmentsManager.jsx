import { useState } from "react";
import { Plus } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

function DepartmentsManager({ isDarkMode }) {
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
        Manage Departments
      </h3>
      <p
        className={`text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        } mb-6`}
      >
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
          className={`w-full border ${
            isDarkMode
              ? "border-gray-700 bg-gray-800 text-white"
              : "border-gray-300 bg-white text-gray-900"
          } rounded-md p-2 text-sm`}
        />
        <button
          type="submit"
          className={`w-full sm:w-auto ${
            isDarkMode
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded flex items-center justify-center text-sm`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </button>
      </form>
      <div className="space-y-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            } gap-4`}
          >
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <p
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } truncate`}
              >
                {dept.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <QRCodeCanvas
                id={`qr-${dept.id}`}
                value={`http://your-site.com/rating?dept=${dept.id}`}
                size={100}
                className="mb-2 sm:mb-0 mx-auto sm:mx-0"
              />
              <button
                onClick={() => downloadQR(dept.id)}
                className={`w-full sm:w-auto border ${
                  isDarkMode
                    ? "border-blue-500 text-blue-500 hover:bg-gray-800"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50"
                } py-2 px-4 rounded text-sm`}
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
