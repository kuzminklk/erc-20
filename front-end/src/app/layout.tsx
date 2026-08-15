

import type { Metadata } from "next";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en">
			<body>
				<WalletContextProvider>
					{children}
				</WalletContextProvider>  
			</body>
		</html>
	);
}
