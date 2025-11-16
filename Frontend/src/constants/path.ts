const path = {
  // Authentication
  home: "/",
  about: "/about",
  login: "/api/v1/auth/login",
  register: "/api/v1/auth/register",
  logout: "api/v1/auth/logout",

  // Users
  mentee_profile: "/api/v1/users/me",
  update_mentor_profile: "users/me/mentor-profile",
  booking: "/api/v1/bookings",

  // Mentee
  mentee_root: "/mentee",
  mentee_home: "/mentee/home",
  mentee_mentors: "/mentee/mentors",
  mentee_top_mentors: "/mentee/top-mentors",


  mentors: "/mentee/mentors",
  mentor_details: "/mentee/mentors/:id",
  mentee_my_sessions: "/mentee/my-sessions",
  mentee_notifications: "/mentee/notifications",

  // Mentor
  mentor_root: "/mentor",
  mentor_home: "/mentor/home",
  mentor_feedback: "/mentor/feedback",
  mentor_profile: "/api/v1/users/me/mentor-profile",
  mentor_notifications: "/mentor/notifications",
  mentor_my_sessions: "/mentor/my-sessions",

};

export default path;
