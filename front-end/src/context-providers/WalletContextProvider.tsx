

"use client"


import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";


const config = createConfig(
	getDefaultConfig({
		chains: [sepolia],
		walletConnectProjectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
		appName: "Strawberry Vendor"
	})
)

const queryClient = new QueryClient();

export function WalletContextProvider({ children }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider theme="retro">
					{children}
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}