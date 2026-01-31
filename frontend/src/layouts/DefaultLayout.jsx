import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/headers/Header";

export function DefaultLayout() {
  return (
    <>
      <Header />

      <main className="min-h-screen pb-2 relative overflow-hidden text-black">
        {/* Camada de gradiente animado */}
        <div className="absolute inset-0 animate-gradientLight" />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}
