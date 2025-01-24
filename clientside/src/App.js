import "./App.css";
// import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MailVerifyPage from "./pages/MailVerifyPage";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            element={
              // <ProtectedRoutes>
                <UserPage />
              // </ProtectedRoutes>
            }
            path="/userpage"
          ></Route>
          <Route
            element={
              // <PublicRoutes>
                <Login />
              // </PublicRoutes>
            }
            path="/"
          ></Route>
          <Route
            element={
              // <PublicRoutes>
                <MailVerifyPage />
              // </PublicRoutes>
            }
            path="/verify/:token"
          ></Route>
          <Route
            element={
              // <PublicRoutes>
                <Register />
              // </PublicRoutes>
            }
            path="/register"
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

// export const PublicRoutes = ({children}) => {
//   const token = localStorage.getItem("data");
//   if (token) {
//     return <Navigate to={"/userpage"}></Navigate>;
//   } else {
//     return children;
//   }
// };

// export const ProtectedRoutes = ({children}) => {
//   const token = localStorage.getItem("data");
//   if (token) {
//     return children;
//   } else {
//     return <Navigate to={"/"}></Navigate>;
//   }
// };

export default App;
