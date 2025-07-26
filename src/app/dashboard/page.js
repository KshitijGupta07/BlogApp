// app/dashboard/page.tsx (SERVER COMPONENT)
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient"; // ⬅ Your current dashboard code moved to a separate file

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login'); // or wherever your login page is
  }

  return <DashboardClient />;
}
