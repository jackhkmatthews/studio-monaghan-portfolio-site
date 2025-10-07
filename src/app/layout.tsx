import type { Metadata } from "next";
import "@/styles/globals.css";
import { textClasses } from "@/styles/textClasses";
import { cn } from "@/lib/utils";

import localFont from "next/font/local";

const abc_otto_variable_trial = localFont({
  src: "../../public/fonts/ABCOttoVariable-Trial.woff2",
  variable: "--font-abco-otto-variable-trial",
});

export const metadata: Metadata = {
  title: "Studio Monaghan",
  description:
    "Original approaches to brand building for creatively-minded clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(abc_otto_variable_trial.variable, `antialiased`)}>
        <header className="px-2 py-4 flex justify-between items-center">
          <h1 className={textClasses.h1}>Studio Monaghan</h1>
          {/* <nav>
            <ul>
              <li>
                <SMLink asChild>
                  <Link href="/about">About</Link>
                </SMLink>
              </li>
            </ul>
          </nav> */}
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
