"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutBtn from "../../components/LogoutBtn";

export default function Sidebar() {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Gallery", href: "/dashboard/gallery" },
    { name: "Careers", href: "/dashboard/careers" },
    { name: "Contact Leads", href: "/dashboard/contact" },
  ];

  return (
    <div className="w-64 bg-[#2C7FAF] text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold">iWave Dashboard</h2>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-3 py-2 rounded-lg font-medium
            ${path === item.href ? "bg-white text-[#2C7FAF]" : "hover:bg-white/20"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="pt-10">
        <LogoutBtn />
      </div>
    </div>
  );
}
