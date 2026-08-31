

"use client"


import { useConnection } from "wagmi";
import { AppKitButton } from "@reown/appkit/react";

import { Buy } from "@/components/Buy";


export default function Home() {
	return (
		<>
		<header>
			<h2>Strawberry Vendor! 🍓</h2>
			<AppKitButton/>
		</header>
		<main>
			<Buy/>
		</main>
		</>
	);
}
