import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "TalentAI",
    description: "Plataforma de Recolocação Profissional",
    icons: {
        icon: "/favicon.svg", // Caminho do favicon
    },
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} antialiased`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
