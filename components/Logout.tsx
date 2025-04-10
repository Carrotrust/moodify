"use client";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/authContext";

const Logout = () => {
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { logOut, currentUser } = auth;

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <Button text="Logout" clickHandler={logOut} />
    </div>
  );
};

export default Logout;
