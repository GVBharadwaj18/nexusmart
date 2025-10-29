import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "NexusMart. -An extraordinary tech store",
    description: "NexusMart.- An extraordinary tech store",
    icons: '/favicon.ico',
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/">
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <StoreProvider>
                    <Toaster />
                    {children}
                </StoreProvider>
            </body>
        </html>
         </ClerkProvider>
    );
}
