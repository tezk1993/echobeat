import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";
import { Sidebar } from "@/Components/Sidebar";
import SupabaseProvider from "@/Providers/SupabaseProvider";
import { UserProvider } from "@/Providers/UserProvider";
import { ModalProvider } from "@/Providers/ModalProvider";
import { ToasterProvider } from "@/Providers/ToasterProvider";
import { getSongsByUserID } from "@/Actions/getSongsByUserID";
import { Player } from "@/Components/Player";
import { getActiveProductsWithPrices } from "@/Actions/getActiveProductsWithPrices";

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

  const products = await getActiveProductsWithPrices();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
