import { createContext, ReactNode, useContext, useState } from "react";
import * as React from "react";

interface SessionContextProps {
  session: boolean;
  user: string | null;
  signIn: (username: string, userLastName: string) => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const signIn = (username: string, userLastName: string) => {
    setSession(true);
    setUser(username);
    setUser(userLastName);
  };

  const signOut = () => {
    setSession(false);
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ session, user, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
