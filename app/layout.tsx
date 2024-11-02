import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import { Sidebar } from "@/Components/Sidebar";
import SupabaseProvider from "@/Providers/SupabaseProvider";
import { UserProvider } from "@/Providers/UserProvider";
import { ModalProvider } from "@/Providers/ModalProvider";
import { ToasterProvider } from "@/Providers/ToasterProvider";
import { getSongsByUserID } from "@/Actions/getSongsByUserID";

export const metadata: Metadata = {
  title: "EchoBeat",
  description: "You music player",
};

const font = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserID();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
