"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [autheticating, setAuthenticating] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { signUp, logIn } = auth;

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async () => {
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setAuthenticating(true);

    try {
      if (isRegister) {
        console.log("Signing up a new user");
        await signUp(email, password);
      } else {
        console.log("Logging in ");
        await logIn(email, password);
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-4 md:gp-6 items-center justify-center">
      <h3 className={`text-3xl md:text-5xl ${fugaz.className}`}>
        {isRegister ? " Register" : "Log in "}
      </h3>
      <p>You&rsquo;re one step away!</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full max-w-[400px] rounded-xl py-3 md:py-4 border border-solid border-indigo-400 hover:border-indigo-600 px-3 md:px-4"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full max-w-[400px] rounded-xl py-3 md:py-4 border border-solid border-indigo-400 hover:border-indigo-600 px-3 md:px-4"
      />

      {error && (
        <p className="text-red-500 text-sm max-w-[400px] text-center">
          {error}
        </p>
      )}
      <div className="max-w-[350px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={autheticating ? "Submitting..." : "Submit"}
          full
        />
      </div>
      <p>
        {isRegister ? "Already have an account ?" : `Don't have an account ?`}
        <span
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
          className="ml-2 text-indigo-500 hover:underline cursor-pointer"
        >
          {isRegister ? "Sign in" : "Sign up"}
        </span>
      </p>
    </div>
  );
};

export default Login;
