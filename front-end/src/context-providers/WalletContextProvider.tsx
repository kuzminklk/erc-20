

"use client"


import { WagmiProvider, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";


const config = createConfig(
	getDefaultConfig({
		chains: [sepolia],
		walletConnectProjectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
		appName: "Strawberry Vendor",
		ssr: true
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