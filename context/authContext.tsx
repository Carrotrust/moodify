"use client";

import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";

type MoodData = {
  [year: number]: {
    [month: number]: {
      [day: number]: string;
    };
  };
};

interface AuthContextType {
  currentUser: User | null;
  userDataObject: MoodData | null;
  setUserDataObject: React.Dispatch<React.SetStateAction<MoodData | null>>;
  signUp: (email: string, password: string) => Promise<any>;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [userDataObject, setUserDataObject] = useState<MoodData | null>(null);

  const [loading, setLoading] = useState(true);

  // AUTH HANDLERS
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setUserDataObject(null);
    setCurrentUser(null);
    return signOut;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        // set user to our local context state
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          console.log("No user found");
          return;
        }

        // if user exists, fetch user from firestore database
        console.log("Fetching...");
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData = {};
        if (docSnap.exists()) {
          console.log("Found user data");
          firebaseData = docSnap.data();
        }
        setUserDataObject(firebaseData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userDataObject,
    setUserDataObject,
    signUp,
    logIn,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
