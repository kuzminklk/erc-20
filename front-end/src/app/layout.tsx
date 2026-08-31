

import type { Metadata } from "next";
import { headers } from "next/headers";
import { Red_Hat_Mono } from "next/font/google";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
	const headersObj = await headers();
	const cookies = headersObj.get("cookies");

	return (
		<html lang="en" className={redHatMono.className}>
			<body>
				<WalletContextProvider cookies={cookies}>
					{children}
				</WalletContextProvider>  
			</body>
		</html>
	);
}
