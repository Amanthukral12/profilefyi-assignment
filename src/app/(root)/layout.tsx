import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <Navbar />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
