"use client";

import { MyUserContextProvider } from "@/Hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};
