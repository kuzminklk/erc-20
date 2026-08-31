

import { cookieStorage, createStorage, http } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, sepolia } from "@reown/appkit/networks";


export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!projectId) {
	throw new Error("Reown project ID is missing!");
}

export const networks = [sepolia];

export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage
	}),
	ssr: true,
	projectId,
	networks
})

export const configuration = wagmiAdapter.wagmiConfig;