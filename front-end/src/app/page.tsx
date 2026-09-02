

"use client"

import { useAppKitState } from "@reown/appkit/react";
import { AppKitButton } from "@reown/appkit/react";

import { Buy } from "@/components/Buy";


export default function Home() {
	const {initialized, loading, open, selectedNetworkId, activeChain} = useAppKitState();

	return (
		<>
		<header>
			<h2>Strawberry Vendor! 🍓</h2>
			{ initialized ? <AppKitButton size="lg"/> : <p>Loading connector <span className="emoji">⏳</span></p>}
		</header>
		<main>
			<Buy/>
		</main>
		</>
	);
}
