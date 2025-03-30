//Sample code for a React Router setup with TypeScript
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "../pages/HomePage";
// import LoginPage from "../pages/LoginPage";
// import DashboardPage from "../pages/DashboardPage";
// import NotFoundPage from "../pages/NotFoundPage";
// import PrivateRoute from "./PrivateRoute";

// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* Route bảo vệ - Chỉ người dùng đăng nhập mới có thể vào Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <DashboardPage />
//             </PrivateRoute>
//           }
//         />

//         {/* 404 - Trang không tìm thấy */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;
