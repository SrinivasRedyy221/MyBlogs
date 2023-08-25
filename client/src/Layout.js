import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <main className="gradient-container" >
      <div className="mx-auto max-w-3xl pt-8  ">
      <Header />
      <Outlet />
      </div>
    </main>
  );
}