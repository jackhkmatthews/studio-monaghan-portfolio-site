import "@/styles/globals.css";
import "@af-utils/scrollend-polyfill";
import { cn } from "@/lib/utils";
import { SanityLive } from "@/sanity/lib/live";

import localFont from "next/font/local";

const abc_otto_variable_trial = localFont({
  src: "../../../../public/fonts/ABCOttoVariable-Trial.woff2",
  variable: "--font-abco-otto-variable-trial",
});

const annexxus_demo = localFont({
  src: "../../../../public/fonts/AnnexxusRegular-Demo.woff2",
  variable: "--font-annexxus-regular-demo",
});

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-brand overflow-y-hidden">
      <body
        className={cn(
          abc_otto_variable_trial.variable,
          annexxus_demo.variable,
          `antialiased h-full min-h-dvh flex flex-col gap-12 lg:gap-16 bg-gray-brand overflow-y-scroll snap-y snap-mandatory relative overscroll-none`
        )}
      >
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
