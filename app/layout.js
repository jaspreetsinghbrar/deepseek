import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deepseek clone by Jaspreet Singh Brar",
  description: "NextJS full-stack project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        {" "}
        <html lang="en">
          <body className={`${inter.variable}  antialiased`}>
            {children}
            <Toaster
              toastOptions={{
                success: { style: { background: "black", color: "white" } },
                error: { style: { background: "black", color: "white" } },
              }}
            />
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
