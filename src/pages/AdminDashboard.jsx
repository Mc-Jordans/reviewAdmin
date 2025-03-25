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
} from "lucide-react";
import DepartmentsManager from "../components/DepartmentsManager";
import StaffManager from "../components/StaffManager";

function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to close
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const sidebarRef = useRef(null);

  // Mock data for main content
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

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // For touch devices

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-950 shadow-md transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`w-full text-left px-4 py-2 rounded flex items-center text-sm ${
              activeTab === "home"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            Departments
          </button>
          <button
            onClick={() => setActiveTab("staff-management")}
            className={`w-full text-left px-4 py-2 rounded flex items-center text-sm ${
              activeTab === "staff-management"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            Staff
          </button>
        </nav>
      </div>

      {/* Overlay for touch-outside-to-hide */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
          onTouchStart={() => setSidebarOpen(false)} // For touch devices
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded ${
              sidebarOpen ? "hidden" : "block"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full sm:w-40 border border-gray-300 rounded-md p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-sm"
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
            </select>
            <button className="w-full sm:w-auto border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-gray-800 text-sm">
              Export Report
            </button>
          </div>
        </div>

        {/* Home Tab with Subtabs */}
        {activeTab === "home" && (
          <>
            <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-6 gap-2">
              {["overview", "departments", "staff", "feedback"].map(
                (subTab) => (
                  <button
                    key={subTab}
                    onClick={() => setActiveSubTab(subTab)}
                    className={`px-3 py-2 text-sm font-medium flex-1 sm:flex-none ${
                      activeSubTab === subTab
                        ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                  <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                    <div className="flex flex-row items-center justify-between pb-2">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Ratings
                      </h3>
                      <Star className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      774
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <TrendingUp className="h-4 w-4 inline mr-1 text-green-500" />
                      +12.5% from last period
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                    <div className="flex flex-row items-center justify-between pb-2">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Average Rating
                      </h3>
                      <Star className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
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
                  <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                    <div className="flex flex-row items-center justify-between pb-2">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Staff Rated
                      </h3>
                      <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      42
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Across 5 departments
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Department Ratings
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      Average ratings by department
                    </p>
                    <div className="h-[200px] sm:h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <BarChart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Rating Trends
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      Rating changes over time
                    </p>
                    <div className="h-[200px] sm:h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <LineChart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Top Rated Staff
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      Staff with highest ratings
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {topStaff.map((staff, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-lg border dark:border-gray-700"
                        >
                          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {staff.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {staff.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {staff.department}
                            </p>
                          </div>
                          <div className="flex items-center flex-shrink-0">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {staff.rating}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
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
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Department Performance
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Ratings and feedback by department
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[200px] sm:h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <PieChart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {departmentRatings.map((dept, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border dark:border-gray-700"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
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
                          <p className="font-bold text-gray-900 dark:text-white">
                            {dept.rating}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
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
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Staff Performance
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Individual staff ratings and feedback
                </p>
                <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400 text-sm">
                  Staff performance data would be displayed here
                </div>
              </div>
            )}

            {activeSubTab === "feedback" && (
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Feedback
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Latest ratings and comments from users
                </p>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border dark:border-gray-700"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {feedback.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
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
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {feedback.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
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
