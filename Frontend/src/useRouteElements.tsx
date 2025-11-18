import { useRoutes } from "react-router-dom";
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

// -- Availability pages --
import MentorSessions from "./pages/Availability/MySessions";
import CreateSession from "./pages/Availability/CreateSession";

// --- Mentee pages ---
import MenteeHome from "./pages/Users/Dashboard";
import Booking from "./pages/mentee/Booking";
import MenteeSessions from "./pages/mentee/MySession";
import MenteeNotification from "./pages/mentee/MenteeNotification";
// --- Mentor pages ---
import MentorDashboard from "./pages/mentor/Dashboard";
import MentorProfile from "./pages/Users/MentorProfile";

// import Feedback from "./pages/mentor/Feedback/Feedback";


export default function useRouteElements() {
  const routeElements = useRoutes([
    // ---------------- Guest Pages ----------------
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <GuestHome /> },
        { path: path.about.replace("/", ""), element: <GuestAbout /> },
        { path: path.login.replace("/", ""), element: <Login /> },
        { path: path.register.replace("/", ""), element: <Register /> }

      ],
    },

    // ---------------- Mentee Pages ----------------
    {
      path: "/",
      element: <MenteeLayout />,
      children: [
        { index: true, element: <MenteeHome /> },
        { path: path.mentee_home, element: <MenteeHome /> },
        { path: path.get_mentors, element: <Mentors /> },
        { path: path.booking, element: <Booking /> },
        { path: path.mentor_details, element: <MentorDetail /> },
        { path: path.mentee_my_sessions, element: <MenteeSessions /> },
        { path: path.mentee_profile, element: <Profile /> },
        { path: path.mentee_notifications, element: <MenteeNotification /> },

      ],
    },

    // ---------------- Mentor Pages ----------------
    {
      path: "/",
      element: <MentorLayout />,
      children: [
        { index: true, element: <MentorDashboard /> },
        { path: path.mentor_home, element: <MentorDashboard /> },
        { path: path.mentor_profile, element: <MentorProfile /> },
        { path: path.update_mentor_profile, element: <UpdateProfile /> },        
        { path: path.mentor_my_sessions, element: <MentorSessions  /> },
        { path: path.create_session, element: <CreateSession /> },
      ],
    },
  ]);

  return routeElements;
}
