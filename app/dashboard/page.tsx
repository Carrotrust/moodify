import React from "react";
import { Metadata } from "next";
import Main from "@/components/Main";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Moodify - Dashboard ",
};

export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
