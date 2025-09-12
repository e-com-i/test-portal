import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ReduxProvider from "@/providers/ReduxProvider";
import Initializer from "./Initializer";
import GlobalProvider from "@/providers/GlobalProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | Shopify`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
       
          <ReduxProvider>
             <GlobalProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Initializer />
              {children}
              <Toaster />
            </ThemeProvider>  </GlobalProvider>
          </ReduxProvider>{" "}
      
      </body>
    </html>
  );
}
