

"use client"


import { useConnection } from "wagmi";
import { ConnectKitButton } from "connectkit";

import { Buy } from "@/components/Buy";


export default function Home() {

	const { isConnected } = useConnection();

	return (
		<>
		<header>
			<h2>Strawberry Vendor! 🍓</h2>
			<ConnectKitButton/>
		</header>
		<main>
			<Buy/>
		</main>
		</>
	);
}
