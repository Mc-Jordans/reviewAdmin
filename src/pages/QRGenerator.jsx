import { useState } from "react";
import { QrCode, Download, Printer, Copy } from "lucide-react";

function QRGenerator() {
  const [department, setDepartment] = useState("");
  const [qrSize, setQrSize] = useState("medium");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");

  // Mock data - in a real app, this would come from an API
  const departments = [
    { id: "admin", name: "Administration" },
    { id: "finance", name: "Finance Department" },
    { id: "academic", name: "Academic Affairs" },
    { id: "library", name: "Library" },
    { id: "it", name: "IT Services" },
  ];

  const handleGenerateQR = () => {
    // In a real app, this would generate a QR code with the department ID
    setQrGenerated(true);
  };

  const getQRSize = () => {
    switch (qrSize) {
      case "small":
        return 150;
      case "medium":
        return 250;
      case "large":
        return 350;
      default:
        return 250;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Department QR Code Generator
        </h1>

        <div className="mb-8">
          <div className="grid w-full grid-cols-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("generate")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "generate"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Generate QR Code
            </button>
            <button
              onClick={() => setActiveTab("instructions")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "instructions"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Instructions
            </button>
          </div>

          {activeTab === "generate" && (
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Create Department QR Code
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate a QR code that links to the rating form for a specific
                department.
              </p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="qr-size"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    QR Code Size
                  </label>
                  <select
                    id="qr-size"
                    value={qrSize}
                    onChange={(e) => setQrSize(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                {qrGenerated && (
                  <div className="flex flex-col items-center space-y-4 pt-4">
                    <div className="border p-4 rounded-lg bg-white">
                      <img
                        src={`/placeholder.svg?height=${getQRSize()}&width=${getQRSize()}`}
                        alt="Department QR Code"
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                      QR Code for:{" "}
                      {departments.find((d) => d.id === department)?.name}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {!qrGenerated ? (
                  <button
                    onClick={handleGenerateQR}
                    className={`w-full py-2 rounded text-white flex items-center justify-center ${
                      !department
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    }`}
                    disabled={!department}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Code
                  </button>
                ) : (
                  <>
                    <button className="w-full sm:w-auto border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-gray-800 flex items-center justify-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </button>
                    <button className="w-full sm:w-auto border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-gray-800 flex items-center justify-center">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </button>
                    <button className="w-full sm:w-auto border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-gray-800 flex items-center justify-center">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Link
                    </button>
                    <button
                      onClick={() => setQrGenerated(false)}
                      className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center justify-center"
                    >
                      Generate New
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === "instructions" && (
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                How to Use QR Codes
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Follow these steps to effectively implement the rating system in
                your department.
              </p>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      1. Generate Department-Specific QR Code
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Create a unique QR code for your department using the
                      generator tab.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      2. Print and Display the QR Code
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Print the QR code and display it prominently in your
                      department where students and visitors can easily see it.
                      Consider placing it near service counters, exit points, or
                      waiting areas.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      3. Encourage Feedback
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Verbally encourage visitors to scan the QR code and
                      provide feedback after receiving service. You might say:
                      "We value your feedback. Please scan this QR code to rate
                      your experience today."
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      4. Monitor and Respond to Feedback
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Regularly check the admin dashboard to view ratings and
                      comments about your department. Use this feedback to
                      improve service quality and recognize outstanding staff
                      members.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Best Practices
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Replace damaged or faded QR codes promptly</li>
                    <li>
                      Consider adding a brief instruction next to the QR code
                    </li>
                    <li>
                      Ensure the QR code is placed at an accessible height
                    </li>
                    <li>Review feedback weekly with your team</li>
                    <li>
                      Celebrate positive feedback and address concerns promptly
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRGenerator;
