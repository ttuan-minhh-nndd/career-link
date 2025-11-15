import { useRoutes } from "react-router-dom";
import path from "./constants/path";

// Layout
import MainLayout from "./layouts/MainLayout";

// --- Guest pages ---
import GuestHome from "./pages/Home";
import GuestAbout from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mentors from "./pages/Mentors";
import MentorDetail from "./pages/MentorDetails";

// --- Mentee pages ---
import MenteeHome from "./pages/mentee/Home";
import Booking from "./pages/mentee/Booking";
// import MenteeSessions from "./pages/mentee/Sessions/MenteeSessions";
// import TopMentors from "./pages/mentee/TopMentors/TopMentors";

// --- Mentor pages ---
import MentorDashboard from "./pages/mentor/Dashboard";
// import Feedback from "./pages/mentor/Feedback/Feedback";
// import Profile from "./pages/mentor/Profile/Profile";
// import Wallet from "./pages/mentor/Wallet/Wallet";
// import Schedule from "./pages/mentor/Schedule/Schedule";

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
        { path: path.register.replace("/", ""), element: <Register /> },
        { path: path.mentors.replace("/", ""), element: <Mentors /> },
        { path: path.mentor_details.replace("/", ""), element: <MentorDetail /> },

      ],
    },

    // ---------------- Mentee Pages ----------------
    {
      path: path.mentee_root,
      element: <MainLayout />,
      children: [
        { index: true, element: <MenteeHome /> },
        { path: "home", element: <MenteeHome /> },
        { path: "mentors", element: <Mentors /> },
        { path: "booking", element: <Booking /> },
        // { path: "sessions", element: <MenteeSessions /> },
        // { path: "top-mentors", element: <TopMentors /> },
      ],
    },

    // ---------------- Mentor Pages ----------------
    {
      path: path.mentor_root,
      element: <MainLayout />,
      children: [
        { index: true, element: <MentorDashboard /> },
        // { path: "feedback", element: <Feedback /> },
        // { path: "profile", element: <Profile /> },
        // { path: "wallet", element: <Wallet /> },
        // { path: "schedule", element: <Schedule /> },
      ],
    },
  ]);

  return routeElements;
}
