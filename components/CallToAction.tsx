"use client";

import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/authContext";

const CallToAction = () => {
  const auth = useAuth();

  if (!auth) {
    return null;
  }
  const { currentUser } = auth;

  if (currentUser) {
    return (
      <div className="max-w-[600px] w-full mx-auto">
        <Link href={"/dashboard"}>
          <Button dark full text="Go to dashboard" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Link href={"/dashboard"}>
          <Button text="Sign Up" />
        </Link>
        <Link href={"/dashboard"}>
          <Button text="Login" dark />
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
