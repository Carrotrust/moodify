import React from "react";
import { Metadata } from "next";
import Main from "@/components/Main";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import { useAuth } from "@/context/authContext";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
  title: "Moodify - Dashboard ",
};

export default function DashboardPage() {
  // const isAuthenticated = true;

  let children;

  // if (loading) {
  //   children = <Loading />;
  // }

  // if (currentUser) {
  //   children = <Dashboard />;
  // }

  // Moved to the dashboard component

  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
