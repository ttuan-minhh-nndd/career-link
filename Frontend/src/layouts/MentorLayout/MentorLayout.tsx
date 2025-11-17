// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import NavHeader from "../../components/MentorHeader";
import Footer from "../../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <NavHeader />
      <Outlet />   
      <Footer />
    </div>
  );
}
