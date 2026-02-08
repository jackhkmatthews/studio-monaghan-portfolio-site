import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { SanityLive } from "@/sanity/lib/live";

import localFont from "next/font/local";
import { Header } from "@/components/header";

const abc_otto_variable_trial = localFont({
  src: "../../../../public/fonts/ABCOttoVariable-Trial.woff2",
  variable: "--font-abco-otto-variable-trial",
});

const annexxus_demo = localFont({
  src: "../../../../public/fonts/AnnexxusRegular-Demo.woff2",
  variable: "--font-annexxus-regular-demo",
});

export default async function RestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-brand">
      <body
        className={cn(
          abc_otto_variable_trial.variable,
          annexxus_demo.variable,
          `antialiased flex flex-col gap-12 lg:gap-16 bg-gray-brand`,
        )}
      >
        <Header />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
