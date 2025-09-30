
import ArticleInfo from "./Pages/ArticleInfo"
import Category from "./Pages/Category"
import CourseInfo from "./Pages/CourseInfo"
import Index from './Pages/Index'
import Courses from "./Pages/Courses"
import Login from "./Components/Login"
import Register from './Components/Register'
import AllArticles from "./Pages/AllArticles"
import ContactUs from "./Pages/ContactUs"
import Search from "./Pages/Search"
import { Children } from "react"
import AdminPanel from './Pages/AdminPanel/Index'
import AdminCourses from './Pages/AdminPanel/Courses'
import AdminUsers from './Pages/AdminPanel/Users'
import Menus from './Pages/AdminPanel/Menus'


const routes = [

    { path: '/', element: <Index /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category-info/:categoryName/:page', element: <Category /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/articles/:page', element: <AllArticles /> },
    { path: '/courses/:page', element: <Courses /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/contact', element: <ContactUs /> },
    { path: '/search/:value', element: <Search /> },
    {
        path: '/admin-p/*', element: <AdminPanel />, children: [
            { path: 'courses', element: <AdminCourses /> },
            { path: 'users', element: <AdminUsers /> },
            { path: 'menus', element: <Menus /> },
        ]
    },

]

export default routes