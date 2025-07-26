import type {Metadata} from "next";
import {Bricolage_Grotesque, Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import {ClerkProvider,} from '@clerk/nextjs'
import './globals.css'

const bricolage = Bricolage_Grotesque({
    variable: "--font-bricolage",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Converso",
    description: "Real-time AI Teaching Platform",
};


const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider appearance={{variables: {colorPrimary: '#fe5933'}}}>
            <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Navbar/>
            {children}
            </body>
            </html>
        </ClerkProvider>
    )
}
