import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "artemOS",
  description: "Dashboard for the Athena Program"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <SessionProvider>
        <body>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
