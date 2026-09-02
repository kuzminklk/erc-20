

"use client"


import React, { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { sepolia } from "@reown/appkit/networks"

import { wagmiAdapter, configuration, projectId } from "@/configuration/wagmi";


const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const metadata = {
	name: "Strawberry Vendor",
	description: "Strawberry tokens vendor",
	url: "https://strawberry-vendor.vercel.app/",
	icons: ["https://avatars.githubusercontent.com/u/179229932"]
}

const modal = createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [sepolia],
	defaultNetwork: sepolia,
	metadata: metadata,
	features:{
		analytics: true
	},
	themeVariables: {
		"--apkt-font-family": "Red Hat Mono",
		"--apkt-font-size-master": "12"
	},
	themeMode: "light"
})

export function WalletContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
	const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

	return (
		<WagmiProvider config={configuration as Config} initialState={initialState}>
			<QueryClientProvider client={queryClient}>
					{children}
			</QueryClientProvider>
		</WagmiProvider>
	)
}