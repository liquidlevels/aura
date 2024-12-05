import { createContext, ReactNode, useContext, useState } from "react";
import * as React from "react";

interface User {
  username: string;
  userLastName: string;
  phoneNumber: string;
}
interface SessionContextProps {
  session: boolean;
  user: User | null;
  signIn: (username: string, userLastName: string, phoneNumber: string) => void;
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
  const [user, setUser] = useState<User | null>(null);

  const signIn = (
    username: string,
    userLastName: string,
    phoneNumber: string
  ) => {
    setSession(true);
    setSession(true);
    setUser({ username, userLastName, phoneNumber });
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

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error(
      "useSession debe ser utilizado dentro de un SessionProvider"
    );
  }
  return context;
};
