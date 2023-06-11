import { createBrowserRouter } from "react-router-dom";
import * as components from '../pages/pages';


const router = createBrowserRouter([
    {
        path: "/",
        element: <components.HomePage/>
    },
    {
        path: "/about",
        element: <components.AboutUsPage/>
    },
    {
        path: "/teacher",
        element: <components.TeacherPage/>
    },
    {
        path: "/contact",
        element: <components.ContactPage/>
    },
    {
        path: "/login",
        element: <components.LoginPage/>
    },
    {
        path: "/dashboard",
        element: <components.DashboardPage/>,
    },
    {
        path: "/dashboard/create-teacher",
        element: <components.CreateTeacher/>,
    },
    {
        path: "/dashboard/create-student",
        element: <components.CreateStudent/>,
    },
    {
        path: "/dashboard/students",
        element: <components.StudentsPage/>,
    },
    {
        path: "/register",
        element: <components.RegisterPage/>
    },
  ]);

export default router;