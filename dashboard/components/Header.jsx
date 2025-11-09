"use client";

import LogoutBtn from "./LogoutBtn";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-white shadow">
      <h2 className="text-xl font-bold text-[#2C7FAF]">Dashboard</h2>
      <LogoutBtn />
    </div>
  );
}
