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

  // Availability
  mentor_my_sessions: "/api/v1/availabilities/mentor/mine",
  create_session: "/api/v1/availabilities/bulk",

  //Booking
  booking: "/api/v1/bookings",

  // Payment
  payment: "/api/v1/payments",
  
  // Mentee
  mentee_root: "/mentee",
  mentee_home: "/mentee/home",
  mentee_top_mentors: "/mentee/top-mentors",
  mentee_mentors: "/mentee/mentors",


  get_mentors: "/api/v1/mentors",
  mentor_details: "/api/v1/mentors/:id",
  mentee_my_sessions: "/mentee/my-sessions",
  mentee_notifications: "/mentee/notifications",

  // Mentor
  mentor_home: "/mentor/home",
  mentor_feedback: "/mentor/feedback",
  mentor_notifications: "/mentor/notifications",


};

export default path;
