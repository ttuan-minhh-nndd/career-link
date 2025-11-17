const path = {
  // Authentication
  home: "/",
  about: "/about",
  login: "/api/v1/auth/login",
  register: "/api/v1/auth/register",
  logout: "api/v1/auth/logout",

  // Users
  mentee_profile: "/api/v1/users/me/mentee",
  mentor_profile: "/api/v1/users/me",
  update_mentor_profile: "/api/v1/users/me/mentor-profile",
  booking: "/api/v1/bookings",

  // Mentee
  mentee_root: "/mentee",
  mentee_home: "/mentee/home",
  mentee_top_mentors: "/mentee/top-mentors",


  get_mentors: "/api/v1/mentors",
  mentor_details: "/api/v1/mentors",
  mentee_my_sessions: "/mentee/my-sessions",
  mentee_notifications: "/mentee/notifications",

  // Mentor
  mentor_root: "/mentor",
  mentor_home: "/mentor/home",
  mentor_feedback: "/mentor/feedback",
  mentor_notifications: "/mentor/notifications",
  mentor_my_sessions: "/mentor/my-sessions",

};

export default path;
