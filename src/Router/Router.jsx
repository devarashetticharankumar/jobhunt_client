import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import LoginPage from "../components/LoginPage";
import JobDetails from "../Pages/JobDetails";
import { API_URL } from "../data/apiPath";
import RegisterUser from "../components/RegisterUser";
import About from "../Pages/About";
import Terms from "../Pages/Terms";
import ContactUs from "../Pages/ContactUs";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import BlogsList from "../Pages/BlogsList";
import BlogDetails from "../Pages/BlogDetails";
import CreateBlog from "../Pages/CreateBlog";
import UpdateBlog from "../Pages/UpdateBlog";
import MyBlogs from "../Pages/MyBlogs";
import ResumesList from "../Pages/ResumesList";
import YouTubeHome from "../Pages/YouTubeHome";
import ProfilePage from "../components/ProfilePage";
import HomePage from "../Pages/HomePage";

// =============================

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/jobs",
        element: <Home />,
      },
      {
        path: "/post-job",
        element: <CreateJob />,
      },
      {
        path: "/my-job",
        element: <MyJobs />,
      },
      {
        path: "/salary",
        element: <SalaryPage />,
      },
      {
        path: "/edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`${API_URL}/jobs/all-jobs/${params.id}`),
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/blogs",
        element: <BlogsList />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetails />,
      },
      {
        path: "/create-blog",
        element: <CreateBlog />,
      },
      {
        path: "/blog/update/:slug",
        element: <UpdateBlog />,
      },
      {
        path: "/my-blogs",
        element: <MyBlogs />,
      },
      {
        path: "/youtube-videos",
        element: <YouTubeHome />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegisterUser />,
  },
]);

export default router;
