import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  Star,
  TrendingUp,
  Users,
  Menu,
  X,
  Home as HomeIcon,
  Sun,
  Moon,
} from "lucide-react";
import DepartmentsManager from "../components/DepartmentsManager";
import StaffManager from "../components/StaffManager";

function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const sidebarRef = useRef(null);

  // Mock data remains the same
  const departmentRatings = [
    { name: "Administration", rating: 4.2, count: 156 },
    { name: "Finance Department", rating: 3.8, count: 98 },
    { name: "Academic Affairs", rating: 4.5, count: 203 },
    { name: "Library", rating: 4.7, count: 175 },
    { name: "IT Services", rating: 4.0, count: 142 },
  ];

  const topStaff = [
    {
      name: "Sarah Davis",
      department: "Academic Affairs",
      rating: 4.9,
      count: 87,
    },
    { name: "Michael Wilson", department: "Library", rating: 4.8, count: 65 },
    {
      name: "Jane Smith",
      department: "Administration",
      rating: 4.7,
      count: 72,
    },
    { name: "Elizabeth Taylor", department: "Library", rating: 4.6, count: 58 },
  ];

  const recentFeedback = [
    {
      name: "John D.",
      department: "Finance Department",
      staff: "Robert Johnson",
      rating: 4,
      comment:
        "Very helpful with my scholarship questions. Explained everything clearly.",
      date: "2 hours ago",
    },
    {
      name: "Mary W.",
      department: "IT Services",
      staff: "James Anderson",
      rating: 5,
      comment: "Fixed my account access issues quickly and professionally.",
      date: "5 hours ago",
    },
    {
      name: "David B.",
      department: "Academic Affairs",
      staff: "Sarah Davis",
      rating: 5,
      comment: "Excellent guidance on course selection. Very knowledgeable.",
      date: "1 day ago",
    },
  ];

  // Toggle theme between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Apply the theme to the document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`w-64 ${
          isDarkMode ? "bg-gray-950" : "bg-white"
        } shadow-md transition-all duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "flex" : "hidden"
        }`}
      >
        <div
          className={`p-4 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } flex justify-between items-center`}
        >
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Admin Panel
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 ${
                isDarkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              } rounded`}
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-2 ${
                isDarkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              } rounded`}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`w-full text-left px-4 py-2 rounded flex items-center text-sm ${
              activeTab === "home"
                ? "bg-blue-600 text-white"
                : `${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
            }`}
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Home
          </button>
          <button
            onClick={() => setActiveTab("departments-management")}
            className={`w-full text-left px-4 py-2 rounded flex items-center text-sm ${
              activeTab === "departments-management"
                ? "bg-blue-600 text-white"
                : `${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
            }`}
          >
            Departments
          </button>
          <button
            onClick={() => setActiveTab("staff-management")}
            className={`w-full text-left px-4 py-2 rounded flex items-center text-sm ${
              activeTab === "staff-management"
                ? "bg-blue-600 text-white"
                : `${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
            }`}
          >
            Staff
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 ${
              isDarkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            } rounded ${sidebarOpen ? "hidden" : "block"}`}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`w-full sm:w-40 border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              } rounded-md p-2 text-sm`}
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
            </select>
            <button
              className={`w-full sm:w-auto border ${
                isDarkMode
                  ? "border-blue-500 text-blue-500 hover:bg-gray-800"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              } py-2 px-4 rounded text-sm`}
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Home Tab with Subtabs */}
        {activeTab === "home" && (
          <>
            <div
              className={`flex flex-wrap border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } mb-6 gap-2`}
            >
              {["overview", "departments", "staff", "feedback"].map(
                (subTab) => (
                  <button
                    key={subTab}
                    onClick={() => setActiveSubTab(subTab)}
                    className={`px-3 py-2 text-sm font-medium flex-1 sm:flex-none ${
                      activeSubTab === subTab
                        ? `${
                            isDarkMode
                              ? "border-b-2 border-blue-500 text-blue-500"
                              : "border-b-2 border-blue-600 text-blue-600"
                          }`
                        : `${
                            isDarkMode
                              ? "text-gray-400 hover:text-gray-200"
                              : "text-gray-500 hover:text-gray-700"
                          }`
                    }`}
                  >
                    {subTab.charAt(0).toUpperCase() + subTab.slice(1)}
                  </button>
                )
              )}
            </div>

            {activeSubTab === "overview" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  <div
                    className={`${
                      isDarkMode ? "bg-gray-950" : "bg-white"
                    } rounded-lg shadow-md p-4 sm:p-6`}
                  >
                    <div className="flex flex-row items-center justify-between pb-2">
                      <h3
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Total Ratings
                      </h3>
                      <Star
                        className={`h-4 w-4 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <div
                      className={`text-xl sm:text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      774
                    </div>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <TrendingUp className="h-4 w-4 inline mr-1 text-green-500" />
                      +12.5% from last period
                    </p>
                  </div>
                  <div
                    className={`${
                      isDarkMode ? "bg-gray-950" : "bg-white"
                    } rounded-lg shadow-md p-4 sm:p-6`}
                  >
                    <div className="flex flex-row items-center justify-between pb-2">
                      <h3
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Average Rating
                      </h3>
                      <Star
                        className={`h-4 w-4 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <div
                      className={`text-xl sm:text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      4.3
                    </div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= 4
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className={`${
                      isDarkMode ? "bg-gray-950" : "bg-white"
                    } rounded-lg shadow-md p-4 sm:p-6`}
                  >
                    <div className="flex flex-row items-center justify-between pb-2">
                      <h3
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Staff Rated
                      </h3>
                      <Users
                        className={`h-4 w-4 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <div
                      className={`text-xl sm:text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      42
                    </div>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Across 5 departments
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      Department Ratings
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      Average ratings by department
                    </p>
                    <div
                      className={`h-[200px] sm:h-[300px] flex items-center justify-center ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-100"
                      } rounded-lg`}
                    >
                      <BarChart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                    </div>
                  </div>

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
                      Rating Trends
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      Rating changes over time
                    </p>
                    <div
                      className={`h-[200px] sm:h-[300px] flex items-center justify-center ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-100"
                      } rounded-lg`}
                    >
                      <LineChart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                    </div>
                  </div>

                  <div
                    className={`md:col-span-2 ${
                      isDarkMode ? "bg-gray-950" : "bg-white"
                    } rounded-lg shadow-md p-4 sm:p-6`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Top Rated Staff
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      Staff with highest ratings
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {topStaff.map((staff, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-4 p-4 rounded-lg border ${
                            isDarkMode ? "border-gray-700" : "border-gray-200"
                          }`}
                        >
                          <div
                            className={`h-10 w-10 ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-200"
                            } rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <span
                              className={`font-medium ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {staff.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
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
                              {staff.department}
                            </p>
                          </div>
                          <div className="flex items-center flex-shrink-0">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span
                              className={`font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {staff.rating}
                            </span>
                            <span
                              className={`text-xs ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              } ml-1`}
                            >
                              ({staff.count})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSubTab === "departments" && (
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
                  Department Performance
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4`}
                >
                  Ratings and feedback by department
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`h-[200px] sm:h-[300px] flex items-center justify-center ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    } rounded-lg`}
                  >
                    <PieChart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {departmentRatings.map((dept, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          isDarkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <div>
                          <p
                            className={`font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {dept.name}
                          </p>
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= Math.round(dept.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {dept.rating}
                          </p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {dept.count} ratings
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === "staff" && (
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
                  Staff Performance
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4`}
                >
                  Individual staff ratings and feedback
                </p>
                <div
                  className={`flex items-center justify-center p-8 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } text-sm`}
                >
                  Staff performance data would be displayed here
                </div>
              </div>
            )}

            {activeSubTab === "feedback" && (
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
                  Recent Feedback
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4`}
                >
                  Latest ratings and comments from users
                </p>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                        <div>
                          <p
                            className={`font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {feedback.name}
                          </p>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {feedback.department} • {feedback.staff}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= feedback.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {feedback.date}
                          </span>
                        </div>
                      </div>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {feedback.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Sidebar Content */}
        {activeTab === "departments-management" && <DepartmentsManager />}
        {activeTab === "staff-management" && <StaffManager />}
      </div>
    </div>
  );
}

export default AdminDashboard;
