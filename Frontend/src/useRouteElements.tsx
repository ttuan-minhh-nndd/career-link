import { Navigate, Outlet, useRoutes } from "react-router-dom";
import path from "./constants/path";

import GuestHome from "./pages/Home";
import GuestAbout from "./pages/About";

// Layout
import MainLayout from "./layouts/MainLayout";
import MenteeLayout from "./layouts/MenteeLayout";
import MentorLayout from "./layouts/MentorLayout";

// --- Authentication pages ---
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// -- User pages ---
import Profile from "./pages/Users/MenteeProfile";
import UpdateProfile from "./pages/Users/UpdateProfile";

//-- Get mentor data page
import Mentors from "./pages/MentorData/Mentors";
import MentorDetail from "./pages/MentorData/MentorDetails";

// --- Mentee pages ---
import MenteeHome from "./pages/Users/Dashboard";
import Booking from "./pages/mentee/Booking";
import MenteeSessions from "./pages/mentee/MySession";
import MenteeNotification from "./pages/mentee/MenteeNotification";
// --- Mentor pages ---
import MentorDashboard from "./pages/mentor/Dashboard";
import MentorProfile from "./pages/Users/MentorProfile";
import MentorSessions from "./pages/Availability/MySessions";
import CreateSession from "./pages/Availability/CreateSession";

import { useContext } from "react";
import { AppContext } from "../context/app.context";
// import Feedback from "./pages/mentor/Feedback/Feedback";

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/api/v1/auth/login" />;
}

// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
  const { isAuthenticated, profile } = useContext(AppContext);

  if (!isAuthenticated) return <Outlet />;

  if (profile?.role === "mentor") {
    return <Navigate to={path.mentor_home} />;
  }

  if (profile?.role === "mentee") {
    return <Navigate to={path.mentee_home} />;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
function MentorRoute() {
  const { profile } = useContext(AppContext);
  return profile.role == "mentor" ? (
    <Outlet />
  ) : (
    <Navigate to={path.mentor_home} />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function MenteeRoute() {
  const { profile } = useContext(AppContext);
  return profile.role == "mentee" ? (
    <Outlet />
  ) : (
    <Navigate to={path.mentee_home} />
  );
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    // ---------------- Guest Pages ----------------
    {
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <MainLayout>
              <Login />
            </MainLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <MainLayout>
              <Register />
            </MainLayout>
          ),
        },
        {
          path: "/",
          element: (
            <MainLayout>
              <GuestHome />
            </MainLayout>
          ),
        },
        {
          path: path.about,
          element: (
            <MainLayout>
              <GuestAbout />
            </MainLayout>
          ),
        },
      ],
    },

    // ---------------- Mentee Pages ----------------
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MenteeRoute />,
          children: [
            {
              path: path.mentee_home,
              element: (
                <MenteeLayout>
                  <MenteeHome />
                </MenteeLayout>
              ),
            },
            {
              path: path.get_mentors,
              element: (
                <MenteeLayout>
                  <Mentors />
                </MenteeLayout>
              ),
            },
            {
              path: path.get_mentors,
              element: (
                <MenteeLayout>
                  <Mentors />
                </MenteeLayout>
              ),
            },
            {
              path: path.booking,
              element: (
                <MenteeLayout>
                  <Booking />
                </MenteeLayout>
              ),
            },
            {
              path: path.mentor_details,
              element: (
                <MenteeLayout>
                  <MentorDetail />
                </MenteeLayout>
              ),
            },
            {
              path: path.mentee_my_sessions,
              element: (
                <MenteeLayout>
                  <MenteeSessions />
                </MenteeLayout>
              ),
            },
            {
              path: path.mentee_profile,
              element: (
                <MenteeLayout>
                  <Profile />
                </MenteeLayout>
              ),
            },
            {
              path: path.mentee_notifications,
              element: (
                <MenteeLayout>
                  <MenteeNotification />
                </MenteeLayout>
              ),
            },
          ],
        },
      ],
    },

    // ---------------- Mentor Pages ----------------
    {
      element: <ProtectedRoute />,
      children: [
<<<<<<< HEAD
        { index: true, element: <MentorDashboard /> },
        { path: path.mentor_home, element: <MentorDashboard /> },
        { path: path.mentor_profile, element: <MentorProfile /> },
        { path: path.update_mentor_profile, element: <UpdateProfile /> },
        // { path: path.mentor_my_sessions, element: <MentorSessions /> },
=======
        {
          element: <MentorRoute />,
          children: [
            {
              path: path.mentor_home,
              element: (
                <MentorLayout>
                  <MentorDashboard />
                </MentorLayout>
              ),
            },
            {
              path: path.mentor_profile,
              element: (
                <MentorLayout>
                  <MentorProfile />
                </MentorLayout>
              ),
            },
            {
              path: path.update_mentor_profile,
              element: (
                <MentorLayout>
                  <UpdateProfile />
                </MentorLayout>
              ),
            },
            {
              path: path.mentor_my_sessions,
              element: (
                <MentorLayout>
                  <MentorSessions />
                </MentorLayout>
              ),
            },
            {
              path: path.create_session,
              element: (
                <MentorLayout>
                  <CreateSession />
                </MentorLayout>
              ),
            },
          ],
        },
>>>>>>> 5320a9855205add3c5dbd1e9f6035b6385afe45a
      ],
    },
  ]);

  return routeElements;
}
