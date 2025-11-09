"use client";

import api from "../lib/api/client";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();

  const logout = async () => {
    await api.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <button 
      onClick={logout} 
      className="text-red-600 font-medium hover:underline"
    >
      Logout
    </button>
  );
}
