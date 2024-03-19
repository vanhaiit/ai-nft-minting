import ThemeConfigProvider from "@/libs/antd/ConfigProvider";
import { RainBowProviders } from "@/libs/rainbow/providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Roboto_Mono, Space_Mono } from "next/font/google";
import { twJoin } from "tailwind-merge";
import MainLayoutHeader from "../_components/layout/header";
import "../globals.css";
import { ReduxProvider } from "@/libs/redux/provider";
import { NotificationProvider } from "../_components/notification";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twJoin(roboto_mono.variable, space_mono.variable)}
        suppressHydrationWarning={true}
      >
        <ThemeConfigProvider>
          <ReduxProvider>
            <RainBowProviders>
              <AntdRegistry>
                <MainLayoutHeader />
                <div
                  className={twJoin(
                    "flex justify-center",
                    "!font-roboto text-neutral1",
                    "min-h-[calc(100svh-80px)]",
                    "relative w-screen mt-20"
                  )}
                >
                  <NotificationProvider>{children}</NotificationProvider>
                </div>
              </AntdRegistry>
            </RainBowProviders>
          </ReduxProvider>
        </ThemeConfigProvider>
      </body>
    </html>
  );
}
