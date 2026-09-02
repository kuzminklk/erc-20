

"use client"


import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { useAppKit } from "@reown/appkit/react"
import { useAppKitState } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";
import { AppKitButton } from "@reown/appkit/react";

import style from "./Buy.module.css";


const CONTRACT_ADDRESS = "0x93E34494ACdd8f7300c83254E08a19010921cCa2";

const CONTRACT_ABI = [
	{
		"type": "function",
		"name": "buyTokens",
		"inputs": [],
		"outputs": [],
		"stateMutability": "payable"
	}
] as const;

export function Buy() {
	const [etherAmount, setEtherAmount] = useState("0.01");

	const { data: hash, error, isPending, writeContract } = useWriteContract();
	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

	const {initialized, loading, selectedNetworkId, activeChain} = useAppKitState();

	const { open, close } = useAppKit();

	const { isConnected } = useAppKitAccount();

	function handleBuy() {
		writeContract({
			address: CONTRACT_ADDRESS,
			abi: CONTRACT_ABI,
			functionName: "buyTokens",
			value: parseEther(etherAmount),
			gas: 300_000n
		})
	}

	const handleButtonClick = () => {
		if (!isConnected) {
			open();
		} else {
			handleBuy();
		}
	}

	return (
		<section className={style.buy}>
			<div className={style.controllers}>
				<div className={style.amount}>
					<label htmlFor="ether-amount"><h3>Amount of Ether 💰 to spend:</h3></label>
					<input 
						id="ether-amount"
						type="number"
						value={etherAmount}
						step="0.01"
						onChange={(event) => setEtherAmount(event.target.value)}
						disabled={isPending || isConfirming}
					/>
				</div>
				<button 
					onClick={handleButtonClick}
					disabled={isPending || isConfirming}
				>
					{ isPending ? "Confirming in Wallet…" : isConfirming ? "Baking on chain…" : isConnected ? "Buy Strawberries! 🌿" : "Connect Wallet 👛" }
				</button>
			</div>
			<div className={style.feedback}>
				{isSuccess && <p>🎉 Success!</p>}
				{isConfirming && <p>⏱️ Transaction is being confirmed…</p>}
				{hash && <p>📜 Hash: {hash}</p>}
				{error && <p>‼️ {error.shortMessage}</p>}
			</div>
		</section>
	);
}