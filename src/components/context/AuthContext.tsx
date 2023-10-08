import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../apis/Apis";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  image?: string | null;
  account_type: string;
  token: string;
}

interface UserContextType {
  user: User | object | null;
  signIn: (userData: object) => Promise<void>;
  signUp: (userData: object) => Promise<void>;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | object | null>(null);
  const { getItem, setItem, removeItem } = useLocalStorage();
  
  const signIn = async (userData: object) => {
    try {
        const { data } = await API.signIn(userData);
        setUser(data);
        setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Error signing in:", error);
      }
  };

  const signUp = async (userData: object) => {
    try {
        const { data } = await API.signUp(userData);
        setUser(data);
        setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Error signing in:", error);
      }
  };

  const signOut = () => {
    setUser(null);
    removeItem("user");
  };

  const checkUser = () => {
    const existUser = getItem("user");
    if (existUser) setUser(existUser);
  };
  
  return (
    <UserContext.Provider value={{ 
        user,
        signIn, 
        signUp, 
        signOut,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
