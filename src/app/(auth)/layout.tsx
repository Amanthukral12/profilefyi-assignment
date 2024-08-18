import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="min-h-screen">{children}</main>;
};

export default Layout;
