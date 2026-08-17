

import type { Metadata } from "next";
import { Red_Hat_Mono } from "next/font/google"

import { WalletContextProvider } from "@/context-providers/WalletContextProvider";
import "./globals.css";


export const metadata: Metadata = {
	title: "Strawberry!",
	description: "Strawberry tokens vendor",
	icons: {
		icon: [
			{
				url: "/strawberry.svg"
			}
		]
	}
};

const redHatMono = Red_Hat_Mono({subsets: ["latin"], weight: "600"})

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={redHatMono.className}>
			<body>
				<WalletContextProvider>
					{children}
				</WalletContextProvider>  
			</body>
		</html>
	);
}
