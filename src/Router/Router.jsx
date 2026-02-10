import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { API_URL } from "../data/apiPath";
import React, { Suspense, lazy } from "react";

// Lazy load components
const Home = lazy(() => import("../Pages/Home"));
const CreateJob = lazy(() => import("../Pages/CreateJob"));
const MyJobs = lazy(() => import("../Pages/MyJobs"));
const SalaryPage = lazy(() => import("../Pages/SalaryPage"));
const UpdateJob = lazy(() => import("../Pages/UpdateJob"));
const LoginPage = lazy(() => import("../components/LoginPage"));
const JobDetails = lazy(() => import("../Pages/JobDetails"));
const RegisterUser = lazy(() => import("../components/RegisterUser"));
const About = lazy(() => import("../Pages/About"));
const Terms = lazy(() => import("../Pages/Terms"));
const ContactUs = lazy(() => import("../Pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const BlogsList = lazy(() => import("../Pages/BlogsList"));
const BlogDetails = lazy(() => import("../Pages/BlogDetails"));
const CreateBlog = lazy(() => import("../Pages/CreateBlog"));
const UpdateBlog = lazy(() => import("../Pages/UpdateBlog"));
const MyBlogs = lazy(() => import("../Pages/MyBlogs"));
const ResumesList = lazy(() => import("../Pages/ResumesList"));
const YouTubeHome = lazy(() => import("../Pages/YouTubeHome"));
const ResumeBuilder = lazy(() => import("../Pages/ResumeBuilder"));
const CreateResume = lazy(() => import("../Pages/CreateResume"));
const ResumeDetail = lazy(() => import("../Pages/ResumeDetail"));
const ProfilePage = lazy(() => import("../components/ProfilePage"));
const HomePage = lazy(() => import("../Pages/HomePage"));
const JobApplicantsPage = lazy(() => import("../Pages/JobApplicantsPage"));
const CompanyPage = lazy(() => import("../Pages/CompanyPage"));
const MyApplications = lazy(() => import("../Pages/MyApplications"));
const AdminAggregator = lazy(() => import("../Pages/AdminAggregator"));

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
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
        path: "/job/:slug",
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
        path: "/resume-builder",
        element: <ResumeBuilder />,
      },
      {
        path: "/create-resume",
        element: <CreateResume />,
      },
      {
        path: "/resume/:id",
        element: <ResumeDetail />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/job-applicants/:jobId",
        element: <JobApplicantsPage />,
      },
      {
        path: "/company/:companyName",
        element: <CompanyPage />,
      },
      {
        path: "/my-applications",
        element: <MyApplications />,
      },
      {
        path: "/admin/aggregator",
        element: <AdminAggregator />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<Loading />}>
        <RegisterUser />
      </Suspense>
    ),
  },
]);

export default router;
