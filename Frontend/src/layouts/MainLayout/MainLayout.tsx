// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />
      <Outlet />   
      <Footer />
    </div>
  );
}
