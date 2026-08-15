

"use client"


import { ConnectKitButton } from "connectkit";

import { Buy } from "@/components/Buy";


export default function Home() {
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
